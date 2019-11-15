import { INFOModel } from "./nfo";

export interface IMovieModelType {
  model: INFOModel;
  setModel(model: INFOModel): IMovieModelType;
  getModel(): INFOModel;
  getXML();
}
export interface IHead {
  (queryString: string): Promise<IMovieModelType>;
}
export interface IToolHead {
  name: string;
  head: IHead;
  type: string[];
}
export interface IQueryOpt {
  queryString: string;
  file: IFileNode;
}
export interface IFileNode {
  title: string;
  key: string;
  children: IFileNode[] | [] | null;
}

export enum MediaKeys {
  Music = "music",
  Jav = "jav",
  Movie = "movie",
  Gentleman = "gentleman",
  Normal = "normal",
  Uncensored = "uncensored"
}

export interface IMediaTypeNode {
  value: string;
  label: string;
  children?: IMediaTypeNode[];
}
