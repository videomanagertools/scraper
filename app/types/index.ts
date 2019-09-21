import { NFOModel, Actor, Uniqueid } from './nfo';
import { EventType } from './event';

export type TreeType = {
  title: string;
  key: string;
  children: TreeType[];
};
export { NFOModel, Actor, Uniqueid, EventType };
