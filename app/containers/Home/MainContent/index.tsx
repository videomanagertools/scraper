import React, { useState, useEffect, useRef } from 'react';
import path from 'path';
import { connect } from 'react-redux';
import MediaInfo from '@components/MediaInfo';
import { readMediaInfoFromNFOSync, writeMediaInfoToNFOSync } from '@utils';
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
        setMediaInfo(readMediaInfoFromNFOSync(nfoPath.current));
      } catch (error) {
        console.info('no nfo file');
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
        console.log(nfoPath.current);
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
