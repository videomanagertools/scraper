import { MediaKeys, MediaTypeNode, ToolHead } from '@types';
import heads from './heads';

const mediaType: MediaTypeNode[] = [
  {
    value: MediaKeys.Movie,
    label: '电影',
    children: [
      {
        value: MediaKeys.Gentleman,
        label: '绅士'
      },
      {
        value: MediaKeys.Normal,
        label: '普通'
      }
    ]
  },
  { value: MediaKeys.Music, label: '音乐' }
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

export const getHeadsByMediaType: (type: string[]) => ToolHead[] = type => {
  const sourceId = type.join('$$');
  return mediaSource[sourceId] || [];
};
