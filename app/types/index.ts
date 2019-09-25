export { NFOModel, Actor, Uniqueid } from './nfo';
export { EventType } from './event';
export { QueryOpt, MovieModelType, ToolHead, Head } from './scraper';

export interface FileNode {
  title: string;
  key: string;
  children: FileNode[] | [] | null;
}
