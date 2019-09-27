import { writeFile, mkdirp } from 'fs-extra';
// import javbus from '../javBus';
import { downloadImg, emitter } from '../../utils';
import { EventType, QueryOpt, ToolHead, FileNode } from '@types';

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
interface TaskResult {
  successTasks: FileNode[];
  failureTasks: FileNode[];
}
class Scraper {
  heads: ToolHead[] = [];

  stopFlag = false;

  loadHead(heads: ToolHead[]): Scraper {
    this.heads = this.heads.concat(heads);
    return this;
  }

  stop(): void {
    this.stopFlag = true;
  }

  async start(queryOpts: QueryOpt[], name: string): Promise<TaskResult> {
    this.stopFlag = false;
    console.log(name, queryOpts);
    const failureTasks = [];
    const successTasks = [];
    const { head } = this.heads.find(t => t.name === name);
    for (let i = 0; i < queryOpts.length; i += 1) {
      if (this.stopFlag) return;
      const str = queryOpts[i].queryString;
      const { file } = queryOpts[i];
      emitter.emit(EventType.SCRAPE_PENDING, file);
      await head(str)
        .then(res => {
          console.log(res.getModel(), file);
          if (this.stopFlag) return;
          return saveAsserts(res, file);
        })
        .then(res => {
          emitter.emit(EventType.SCRAPE_SUCCESS, file, res.getModel());
          return successTasks.push(file);
        })
        .catch(error => {
          console.log(error);
          emitter.emit(EventType.SCRAPE_FAIL, file);
          failureTasks.push(file);
        });
    }
    emitter.emit(EventType.SCRAPE_TASK_END, { failureTasks, successTasks });
    return {
      failureTasks,
      successTasks
    };
  }
}

export default Scraper;
