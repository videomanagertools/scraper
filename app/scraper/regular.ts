import { MediaType } from '@types';

export default {
  [MediaType.Movie]: /[a-zA-Z0-9:\u4e00-\u9fa5]+/,
  [MediaType.Jav]: /\d{3,10}(_|-)\d{3,10}|[a-z]{3,10}(_|-)(\d|[a-z]){3,10}/i,
  [MediaType.Music]: /[a-z]/
};
