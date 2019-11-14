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
  type: string[];
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

export enum MediaKeys {
  Music = 'music',
  Jav = 'jav',
  Movie = 'movie',
  Gentleman = 'gentleman',
  Normal = 'normal',
  Uncensored = 'uncensored'
}

export interface MediaTypeNode {
  value: string;
  label: string;
  children?: MediaTypeNode[];
}
