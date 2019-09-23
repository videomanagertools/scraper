import { NFOModel } from './nfo';

export interface MovieModelType {
  model: NFOModel;
  setModel(model: NFOModel): MovieModelType;
  getModel(): NFOModel;
  getXML();
}
export interface ToolHead {
  (queryString: string): MovieModelType;
}
export interface QueryOpt {
  queryString: string;
  file: any;
}
