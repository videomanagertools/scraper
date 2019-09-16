// import douban from '../douban';
import { writeFile, mkdirp } from 'fs-extra';
import javbus from '../javBus';
import { downloadImg, defaultRegExp } from '../../utils';

export interface QueryOpt {
  queryString: string;
  file: any;
}
export default async (queryOpts: QueryOpt[]) => {
  // for (let i = 0; i < queryOpts.length; i += 1) {
  //   let str = queryOpts[i].queryString;
  //   await javbus((str.match(defaultRegExp.jav) || [str])[0])
  //     .then(res => {
  //       console.log(res, queryOpts[i].file);
  //       return saveAsserts(res, queryOpts[i].file);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};
const saveAsserts = async (model, file) => {
  const json = model.getModel();
  console.log(json, file);
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
