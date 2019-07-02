import generateNFO from './fileGenerator';
import config from '../scraper/douban.config';

const superagent = require('superagent');
const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

const basePath = path.join(__dirname);

export default async (queryString: string) => {
  try {
    const surl = config.url.replace(/\$\{q}/g, encodeURIComponent(queryString));
    const res = await superagent.get(surl);
    await fs.writeFile(path.join(basePath, './baidu.html'), res.text);
    const $ = cheerio.load(res.text);
    const data = {
      movie: {
        title: $('title').text()
      }
    };
    generateNFO(path.join(basePath, queryString), data);
  } catch (err) {
    console.error(err);
  }
};
