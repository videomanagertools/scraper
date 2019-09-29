// import douban from '../douban';

import { writeFile, mkdirp } from 'fs-extra';
import javbus from '../javbus';
import { downloadImg, defaultRegExp, emitter } from '../../utils';
import { EventType } from '@types';

let stopFlag = false;
export interface QueryOpt {
  queryString: string;
  file: any;
}
export default async (queryOpts: QueryOpt[]) => {
  stopFlag = false;
  const failureTasks = [];
  const successTasks = [];
  for (let i = 0; i < queryOpts.length; i += 1) {
    if (stopFlag) return;
    const str = queryOpts[i].queryString;
    const { file } = queryOpts[i];
    emitter.emit(
      EventType.SCRAPE_PENDING,
      file,
      (str.match(defaultRegExp.jav) || [str])[0]
    );
    await javbus((str.match(defaultRegExp.jav) || [str])[0])
      .then(res => {
        console.log(res.getModel(), file);
        if (stopFlag) return;
        return saveAsserts(res, file);
      })
      .then(res => {
        emitter.emit(EventType.SCRAPE_SUCCESS, file, res.getModel());
        return successTasks.push(file);
      })
      .catch(error => {
        console.log(error);
        emitter.emit(EventType.SCRAPE_FAIL, file);
        failureTasks.push({ file, error });
      });
  }
  console.log(111);
  emitter.emit(EventType.SCRAPE_TASK_END, { failureTasks, successTasks });
  return {
    failureTasks,
    successTasks
  };
};
export const stop = () => {
  stopFlag = true;
};
const saveAsserts = async (model, file) => {
  const json = model.getModel();
  await mkdirp(`${file.wpath}/.actors`);
  return Promise.all([
    writeFile(
      `${file.wpath + file.title}.nfo`,
      `<?xml version="1.0" encoding="utf-8" standalone="yes"?>${model.getXML()}`
    ),
    downloadImg(json.art.poster._text, `${file.wpath + file.title}-poster.jpg`),
    downloadImg(json.art.fanart._text, `${file.wpath + file.title}-fanart.jpg`),
    json.actor.map(v =>
      downloadImg(v.thumb._text, `${file.wpath}.actors/${v.name._text}.jpg`)
    )
  ])
    .then(() => model)
    .catch(e => {
      console.log(e);
      console.log('save asserts error', file.wpath);
    });
};
