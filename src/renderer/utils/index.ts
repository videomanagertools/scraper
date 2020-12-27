// import * as R from 'ramda';
import fs, { readFileSync, writeFileSync, readdirSync } from "fs-extra";
import path from "path";
import { message } from "antd";
import _emitter from "./emitter";
import { IFileNode, INFOModel } from "@types";
import { xml2js, js2xml } from "./xml";

import request from "request";

export { takeScreenshots } from "./video";
export { js2xml, xml2js } from "./xml";

export function isDir(spath: string) {
  const stats = fs.statSync(spath);
  return stats.isDirectory();
}
export const generateFileTree = (paths: Array<string>): IFileNode[] => {
  const result = [];
  let fileCount = 0;
  function walk(wpath, key) {
    let walkRes = {
      title: "",
      ext: "",
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
    } else if (/(\.mp4|\.rmvb|\.avi|\.wmv)$/i.test(wpath)) {
      const name = path.basename(wpath).split(".");
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
    message.error("no media file");
    throw new Error("no media file");
  }
  return result;
};

export function flatTrees(trees: Record<string, any>[]): Record<string, any> {
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

export const downloadImg = (url, ipath, opt?) =>
  new Promise((resolve, reject) => {
    request({ url, ...opt })
      .pipe(fs.createWriteStream(ipath))
      .on("finish", () => {
        resolve(ipath);
      })
      .on("error", e => {
        reject(e);
      });
  });

export const getDefaultOsPath = () => {
  if (process.platform === "win32") {
    return "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  }
  return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
};

export const emitter = _emitter;

export const readMediaInfoFromNFOSync = (NFOFile: string): INFOModel => {
  type Info = {
    movie: INFOModel;
  };
  const xml = readFileSync(NFOFile, { encoding: "utf8" });
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
      : [],
    tag: movie.tag
      ? Array.isArray(movie.tag)
        ? movie.tag
        : [movie.tag]
      : []
  };
};
export const writeMediaInfoToNFOSync = (
  ipath: string,
  data: INFOModel
): void => {
  const base = {
    _declaration: {
      _attributes: { version: "1.0", encoding: "utf-8", standalone: "yes" }
    }
  };
  const json = Object.assign({}, base, { movie: data });
  const xml = js2xml(json);
  writeFileSync(ipath, xml, "utf8");
};
export const readThumbnails = wpath => {
  const tbPath = path.join(wpath, ".thumbnails");
  console.log(readdirSync(tbPath));
  return (readdirSync(tbPath) || [])
    .sort((n1, n2) => parseInt(n1, 10) - parseInt(n2, 10))
    .map(name => path.join(tbPath, name));
};
