import { NFOModel } from './nfo';

export interface MovieModelType {
  model: NFOModel;
  setModel(model: NFOModel): MovieModelType;
  getModel(): NFOModel;
  getXML();
}
export interface Head {
  (queryString: string): MovieModelType;
}
export interface ToolHead {
  name: string;
  head: Head;
}
export interface QueryOpt {
  queryString: string;
  file: any;
}
