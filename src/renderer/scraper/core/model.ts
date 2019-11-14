import { js2xml } from '@utils';
import { NFOModel, MovieModelType } from '../../types';

export default class MovieModel implements MovieModelType {
  model: NFOModel = {};

  setModel(model: NFOModel): MovieModelType {
    this.model = Object.assign({}, this.model, model);
    return this;
  }

  getModel(): NFOModel {
    return this.model;
  }

  getXML() {
    return js2xml({ movie: this.model });
  }
}
