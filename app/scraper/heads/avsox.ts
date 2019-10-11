import cheerio from 'cheerio';
import MovieModel from '../core/model';
import { MediaKeys } from '@types';

export default request => ({
  head: async (queryString: string): Promise<any> => {
    const movieModel = new MovieModel();
    const encodedQueryString = encodeURIComponent(queryString);
    const searchPage = await request({
      url: `https://avsox.asia/cn/search/${encodedQueryString}`
    });
    const infoPageUrl = cheerio
      .load(searchPage)('.movie-box')
      .attr('href')
      .replace(/https:\/\//, 'http://');
    const $ = cheerio.load(await request({ url: infoPageUrl }));
    movieModel.setModel({
      title: {
        _text: $('h3')
          .text()
          .trim()
      },
      premiered: {
        _text: $('.info>p:nth-child(2)')
          .text()
          .split(': ')[1]
          .trim()
      },
      art: {
        poster: {
          _text: $('.bigImage')
            .attr('href')
            .trim()
            .replace(/https:\/\//, 'http://')
        },
        fanart: {
          _text: $('.bigImage')
            .attr('href')
            .trim()
            .replace(/https:\/\//, 'http://')
        }
      },
      actor: $('#avatar-waterfall .avatar-box img')
        .map((index, $actor) => ({
          name: { _text: $actor.attribs.title.trim() },
          thumb: {
            _text: $actor.attribs.src.trim().replace(/https:\/\//, 'http://')
          }
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
      genre: $('.info .genre>a')
        .map((index, $genre) => ({ _text: $genre.firstChild.data.trim() }))
        .toArray()
    });
    return movieModel;
  },
  name: 'avsox',
  type: [MediaKeys.Movie, MediaKeys.Gentleman]
});
