import superagent from 'superagent';
import cheerio from 'cheerio';
import MovieModel from './model';
import { ModelType } from '../shared';

export default async (queryString: string): Promise<ModelType> => {
  const movieModel = new MovieModel();
  const res = await superagent.get(`http://www.baidu.com${queryString}`);
  const $ = cheerio.load(res.text);

  movieModel.setModel({
    title: $('title').text()
  });
  return movieModel.getXML();
};
