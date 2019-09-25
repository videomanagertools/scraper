// import * as R from 'ramda';
import fs, { readFileSync } from 'fs-extra';
import path from 'path';
import { message } from 'antd';
import _emitter from './emitter';
import { FileNode } from '@types';
import { xml2js } from './xml';

const request = require('request');

export { js2xml, xml2js } from './xml';
export const generateFileTree = (paths: Array<string>): FileNode[] => {
  const result = [];
  let fileCount = 0;
  function walk(wpath, key) {
    let walkRes = {
      title: '',
      ext: '',
      isDir: false,
      key,
      children: [],
      wpath,
      fullpath: wpath
    };
    if (isDir(wpath)) {
      walkRes.title = path.basename(wpath);
      walkRes.isDir = true;
      const wpaths = fs.readdirSync(wpath);
      let needDel = true;
      wpaths.forEach((dpath, index) => {
        const ddpath = path.join(wpath, dpath);
        const child = walk(ddpath, `${key}-${index}`);
        if (child) {
          walkRes.children.push(child);
          needDel = false;
        }
      });
      if (needDel) {
        walkRes = null;
      }
    } else if (/(.mp4|.rmvb|.avi|.wmv)$/.test(wpath)) {
      const name = path.basename(wpath).split('.');
      walkRes = {
        title: name[0],
        ext: name[1],
        key,
        isDir: false,
        children: null,
        wpath: `${path.dirname(wpath)}/`,
        fullpath: wpath
      };
      fileCount += 1;
    } else {
      walkRes = null;
    }

    return walkRes;
  }
  paths.forEach((spath, index) => {
    result.push(walk(spath, `0-${index}`));
  });
  if (fileCount === 0) {
    message.error('no media file');
    throw new Error('no media file');
  }
  return result;
};
export function isDir(spath: string) {
  const stats = fs.statSync(spath);
  return stats.isDirectory();
}

export function flatTrees(trees: Object[]): Object {
  const result = {};
  function walk(arr) {
    arr.forEach(node => {
      result[node.key] = node;
      if (node.children) {
        walk(node.children);
      }
    });
  }
  walk(trees);
  return result;
}

export const sleep = time =>
  new Promise(resolve => {
    // 成功执行
    try {
      setTimeout(() => {
        resolve();
      }, time);
    } catch (err) {
      console.log(err);
    }
  });

export const downloadImg = (url, ipath) =>
  new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(ipath))
      .on('finish', () => {
        resolve(ipath);
      })
      .on('error', e => {
        reject(e);
      });
  });

export const getDefaultOsPath = () => {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  }
  return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
};
export const defaultRegExp = {
  jav: /\d{3,10}(_|-)\d{3,10}|[a-z]{3,10}(_|-)(\d|[a-z]){3,10}/i
};

export const emitter = _emitter;

export const readMediaInfoByNFOSync = (NFOFile: string) => {
  type Info = {
    movie: { genre: string | string[]; actor: string | string[] };
  };
  const xml = readFileSync(NFOFile, { encoding: 'utf8' });
  const { movie } = xml2js(xml) as Info;
  return {
    ...movie,
    genre: movie.genre
      ? Array.isArray(movie.genre)
        ? movie.genre
        : [movie.genre]
      : [],
    actor: movie.actor
      ? Array.isArray(movie.actor)
        ? movie.actor
        : [movie.actor]
      : []
  };
};
