import xmljs from 'xml-js';
import { ModelType } from '../../shared';

export default class MovieModel {
  private model: ModelType = {};

  setModel(model: ModelType): MovieModel {
    this.model = Object.assign({}, this.model, model);
    return this;
  }

  getModel(): ModelType {
    return this.model;
  }

  getXML() {
    return xmljs.js2xml({ movie: this.model }, { compact: true, spaces: 4 });
  }
}
