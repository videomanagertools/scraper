import xmljs from 'xml-js';
import { NFOModel } from '../../types';

export default class MovieModel {
  private model: NFOModel = {};

  setModel(model: NFOModel): MovieModel {
    this.model = Object.assign({}, this.model, model);
    return this;
  }

  getModel(): NFOModel {
    return this.model;
  }

  getXML() {
    return xmljs.js2xml({ movie: this.model }, { compact: true, spaces: 4 });
  }
}
