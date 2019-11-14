import React, { useState, useEffect, useRef } from 'react';
import path from 'path';
import { connect } from 'react-redux';
import MediaInfo from '@components/MediaInfo';
import {
  readMediaInfoFromNFOSync,
  writeMediaInfoToNFOSync,
  readThumbnails
} from '@utils';
import config from '@config';

const mapStateToProps = ({ file }) => {
  const { tree, checkedKeys, selectedKey, failureKeys, flatTree } = file;
  return {
    tree,
    checkedKeys,
    selectedKey,
    failureKeys,
    flatTree
  };
};
const MainContent = ({ selectedKey, flatTree }) => {
  const [mediaInfo, setMediaInfo] = useState(null);
  const nfoPath = useRef('');
  const tags = config.get('tags', []) as string[];
  useEffect(() => {
    if (selectedKey) {
      const node = flatTree[selectedKey];
      nfoPath.current = path.join(node.wpath, `${node.title}.nfo`);
      try {
        let thumbnails = [];
        try {
          thumbnails = readThumbnails(node.wpath);
        } catch (err) {
          console.warn(err);
        }
        setMediaInfo({
          ...readMediaInfoFromNFOSync(nfoPath.current),
          thumbnails
        });
      } catch (error) {
        console.warn('no nfo file', error);
        setMediaInfo(null);
      }
    }
  }, [selectedKey]);
  return mediaInfo ? (
    <MediaInfo
      currentMediaInfo={mediaInfo}
      tags={tags}
      onSelect={iTags => {
        config.set('tags', [...new Set(tags.concat(iTags))]);
        if (!nfoPath.current) return;
        const info = Object.assign({}, mediaInfo, {
          tag: iTags.map(tag => ({ _text: tag }))
        });
        setMediaInfo({ ...mediaInfo, tag: iTags.map(tag => ({ _text: tag })) });
        writeMediaInfoToNFOSync(nfoPath.current, info);
      }}
      selectable
    />
  ) : (
    <div />
  );
};

export default connect(mapStateToProps)(MainContent);
