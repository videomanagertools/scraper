import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import MovieModel from './core/model';

export default async (queryString: string): Promise<any> => {
  const movieModel = new MovieModel();
  const encodedQueryString = encodeURIComponent(queryString);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://www.javbus.com/uncensored/search/${encodedQueryString}`,
    { waitUntil: 'networkidle2' }
  );
  await page.click('.movie-box');
  await page.waitForSelector('.bigImage');
  const html = await page.$eval('.container', el => el.outerHTML);
  const $ = cheerio.load(html);
  movieModel.setModel({
    title: $('h3')
      .text()
      .trim(),
    premiered: $('.info>p:nth-child(2)')
      .text()
      .split(': ')[1]
      .trim(),
    art: {
      poster: $('.bigImage')
        .attr('href')
        .trim(),
      fanart: $('.bigImage')
        .attr('href')
        .trim()
    },
    actor: $('.info>ul li img')
      .map((index, $actor) => ({
        name: $actor.attribs.title.trim(),
        thumb: $actor.attribs.src.trim()
      }))
      .toArray(),
    uniqueid: [
      {
        _attributes: { type: '1', default: true },
        _text: $('.info>p:nth-child(1)>span:nth-child(2)')
          .text()
          .trim()
      }
    ],
    genre: $('.info>p:nth-child(6) .genre>a')
      .map((index, $actor) => $actor.firstChild.data.trim())
      .toArray()
  });
  browser.close();
  return movieModel;
};
