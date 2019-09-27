import request from 'request-promise';
// import cheerio from 'cheerio';
import MovieModel from '../core/model';
import { MovieModelType } from '@types';

export default async (queryString: string): Promise<MovieModelType> => {
  const movieModel = new MovieModel();
  const encodedQueryString = encodeURIComponent(queryString);
  const info = await request({
    url: `http://api.themoviedb.org/3/search/movie`,
    qs: {
      api_key: '72b18d1a0b41c17728448bfb2b922d26',
      language: 'zh',
      query: encodedQueryString
    },
    json: true
  });

  console.log(movieModel, info);

  if (!info.total_results) {
    throw new Error('无影片信息');
  }
  return movieModel;
};
