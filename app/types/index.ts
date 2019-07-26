import { NFOModel, Actor, Uniqueid } from './nfo';

export type TreeType = {
  title: string;
  key: string;
  children: TreeType[];
}[];
export { NFOModel, Actor, Uniqueid };
