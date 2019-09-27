import Scraper from './core/index';
import { MediaType } from '@types';
import tmdb from './heads/tmdb';
import javbus from './heads/javbus';

const heads = [
  { name: 'tmdb', head: tmdb, type: MediaType.Movie },
  {
    name: 'javbus',
    head: javbus,
    type: MediaType.Jav
  }
];
const scraper = new Scraper();
scraper.loadHead(heads);
export default scraper;
export { heads };
