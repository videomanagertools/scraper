import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import MovieModel from './core/model';

export default async (queryString: string): Promise<any> => {
  const movieModel = new MovieModel();
  const encodedQueryString = encodeURIComponent(queryString);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://movie.douban.com/subject_search?search_text=${encodedQueryString}`,
    { waitUntil: 'networkidle2' }
  );
  await page.click('.item-root>a');
  await page.waitForSelector('#content');
  const html = await page.$eval('#content', el => el.outerHTML);
  const $ = cheerio.load(html);
  movieModel.setModel({
    title: $('h1>span:nth-child(1)').text(),
    year: $('h1 .year').text(),
    art: { poster: $('#mainpic>a>img').attr('src') },
    actor: $('#info>.actor>.attrs>a')
      .map((index, $actor) => ({ name: $actor.children[0].data }))
      .toArray(),
    uniqueid: [{ _attributes: { type: '1', default: true }, _text: 'text' }]
  });
  return movieModel.getXML();
};
