import { js2xml } from "@utils";
import { INFOModel, IMovieModelType } from "../../types";

export default class MovieModel implements IMovieModelType {
  model: INFOModel = {};

  setModel(model: INFOModel): IMovieModelType {
    this.model = Object.assign({}, this.model, model);
    return this;
  }

  getModel(): INFOModel {
    return this.model;
  }

  getXML() {
    return js2xml({ movie: this.model });
  }
}
