import { MediaKeys, MediaTypeNode, ToolHead } from '@types';
import heads from './heads';

const mediaType: MediaTypeNode[] = [
  {
    value: MediaKeys.Movie,
    label: '电影',
    children: [
      {
        value: MediaKeys.Gentleman,
        label: '绅士（骑兵）'
      },
      {
        value: MediaKeys.Uncensored,
        label: '绅士（步兵）'
      },
      {
        value: MediaKeys.Normal,
        label: '普通'
      }
    ]
  }
];
export default mediaType;

const mediaSource = heads.reduce((acc, head) => {
  const sourceId = head.type.join('$$');
  if (acc[sourceId]) {
    acc[sourceId].push(head);
  } else {
    acc[sourceId] = [head];
  }
  return acc;
}, {});
const regular = {
  [`${MediaKeys.Movie}$$${MediaKeys.Normal}`]: /[a-zA-Z0-9:\u4e00-\u9fa5]+/,
  [`${MediaKeys.Movie}$$${MediaKeys.Gentleman}`]: /\d{3,10}(_|-)\d{3,10}|[a-z]{3,10}(_|-)(\d|[a-z]){3,10}/i,
  [`${MediaKeys.Movie}$$${MediaKeys.Uncensored}`]: /\d{3,10}(_|-)\d{3,10}|[a-z]{3,10}(_|-)(\d|[a-z]){3,10}/i,
  [MediaKeys.Music]: /[a-z]/
};
export const getHeadsByMediaType: (type: string[]) => ToolHead[] = type => {
  const sourceId = type.join('$$');
  return mediaSource[sourceId] || [];
};
export const getRegularByMediaType: (type: string[]) => RegExp = type => {
  const sourceId = type.join('$$');
  return regular[sourceId];
};
