import r from '../request';
import { ToolHead } from '@types';
import tmdb from './tmdb';
import javbus from './javbus';
import avsox from './avsox';

const heads: ToolHead[] = [tmdb(r), javbus(r), avsox(r)];
export default heads;
