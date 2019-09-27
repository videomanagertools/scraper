import { NFOModel } from './nfo';

export interface MovieModelType {
  model: NFOModel;
  setModel(model: NFOModel): MovieModelType;
  getModel(): NFOModel;
  getXML();
}
export interface Head {
  (queryString: string): Promise<MovieModelType>;
}
export interface ToolHead {
  name: string;
  head: Head;
  regular?: RegExp;
}
export interface QueryOpt {
  queryString: string;
  file: FileNode;
}
export interface FileNode {
  title: string;
  key: string;
  children: FileNode[] | [] | null;
}

export enum MediaType {
  Music = 'music',
  Jav = 'jav',
  Movie = 'movie'
}
