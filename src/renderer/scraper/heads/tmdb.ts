import MovieModel from '../core/model';
import { MovieModelType, MediaKeys } from '@types';

export default request => ({
  head: async (queryString: string): Promise<MovieModelType> => {
    const movieModel = new MovieModel();
    const baseUrl = 'http://api.themoviedb.org/3';
    const baseImgUrl = 'http://image.tmdb.org/t/p';
    const baseParam = {
      api_key: '72b18d1a0b41c17728448bfb2b922d26',
      language: 'zh'
    };
    const res = await request({
      url: `${baseUrl}/search/movie`,
      qs: {
        ...baseParam,
        query: queryString
      },
      json: true
    });

    if (!res.total_results) {
      throw new Error('无影片信息');
    }
    const { id } = res.results[0];
    const info = await request({
      url: `${baseUrl}/movie/${id}`,
      qs: {
        ...baseParam
      },
      json: true
    });
    const actors = await request({
      url: `${baseUrl}/movie/${id}/credits`,
      qs: baseParam,
      json: true
    }).then(r => r.cast);
    const {
      title,
      release_date,
      overview,
      poster_path,
      backdrop_path,
      genres
    } = info;
    movieModel.setModel({
      title: { _text: title },
      plot: {
        _text: overview
      },
      premiered: release_date,
      art: {
        poster: { _text: `${baseImgUrl}/w500/${poster_path}` },
        fanart: { _text: `${baseImgUrl}/w1280/${backdrop_path}` }
      },
      actor: actors.map(a => ({
        name: {
          _text: a.name
        },
        thumb: {
          _text: `${baseImgUrl}/w185/${a.profile_path}`
        }
      })),
      uniqueid: [
        {
          _attributes: {
            default: true,
            type: '1'
          },
          _text: id
        }
      ],
      genre: genres.map(g => ({ _text: g.name }))
    });
    return movieModel;
  },
  name: 'TMDB',
  type: [MediaKeys.Movie, MediaKeys.Normal]
});
