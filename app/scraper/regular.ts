import { MediaKeys } from '@types';

export default {
  [MediaKeys.Movie]: /[a-zA-Z0-9:\u4e00-\u9fa5]+/,
  [MediaKeys.Jav]: /\d{3,10}(_|-)\d{3,10}|[a-z]{3,10}(_|-)(\d|[a-z]){3,10}/i,
  [MediaKeys.Music]: /[a-z]/
};
