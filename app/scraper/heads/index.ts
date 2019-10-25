import r from '../request';
import { ToolHead } from '@types';
import tmdb from './tmdb';
import javbus from './javbus';
import avsox from './avsox';

const heads: ToolHead[] = [tmdb(r), avsox(r), javbus(r)];
export default heads;
