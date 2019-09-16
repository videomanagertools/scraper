// import douban from '../douban';
import { writeFile, mkdirp } from 'fs-extra';
import javbus from '../javBus';
import { downloadImg, defaultRegExp } from '../../utils';

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
    await javbus((str.match(defaultRegExp.jav) || [str])[0])
      .then(res => {
        console.log(res.getModel(), queryOpts[i].file);
        if (stopFlag) return;
        return saveAsserts(res, queryOpts[i].file);
      })
      .then(() => successTasks.push(queryOpts[i].file))
      .catch(error => {
        failureTasks.push({ file: queryOpts[i].file, error });
      });
  }
  return {
    successTasks,
    failureTasks
  };
  // return Promise.all(
  //   queryOpts.map(opt => {
  //     let str = opt.queryString;
  //     return javbus((str.match(defaultRegExp.jav) || [str])[0]).then(
  //       async res => {
  //         await saveAsserts(res, opt.file);
  //         return res;
  //       }
  //     );
  //   })
  // )
  //   .then(arr => {
  //     console.log(arr);
  //   })
  //   .catch(err => {
  //     console.log(err, 2);
  //   });
};
export const stop = () => {
  stopFlag = true;
};
const saveAsserts = async (model, file) => {
  const json = model.getModel();
  await mkdirp(`${file.wpath}.actors`);
  return Promise.all([
    writeFile(
      `${file.wpath + file.title}.nfo`,
      `<?xml version="1.0" encoding="utf-8" standalone="yes"?>${model.getXML()}`
    ),
    downloadImg(json.art.poster, `${file.wpath + file.title}-poster.jpg`),
    downloadImg(json.art.fanart, `${file.wpath + file.title}-fanart.jpg`),
    json.actor.map(v =>
      downloadImg(v.thumb, `${file.wpath}.actors/${v.title}.jpg`)
    )
  ]);
};
