import json2xml from 'json2xml';
import { ModelType } from '../shared';

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
    return json2xml(this.model, { header: true });
  }
}
