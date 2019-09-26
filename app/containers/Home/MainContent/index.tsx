import React from 'react';
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
const tags = config.get('tags', []) as string[];
const MainContent = ({ selectedKey, flatTree }) => {
  let mediaInfo = null;
  let nfoPath = '';
  if (selectedKey) {
    const node = flatTree[selectedKey];
    nfoPath = path.join(node.wpath, `${node.title}.nfo`);
    try {
      mediaInfo = readMediaInfoFromNFOSync(nfoPath);
    } catch (error) {
      console.info('no nfo file');
    }
    console.log(mediaInfo);
  }
  return mediaInfo ? (
    <MediaInfo
      currentMediaInfo={mediaInfo}
      tags={tags}
      onSelect={iTags => {
        config.set('tags', [...new Set(tags.concat(iTags))]);
        if (!nfoPath) return;
        const info = Object.assign({}, mediaInfo, {
          tag: iTags.map(tag => ({ _text: tag }))
        });
        writeMediaInfoToNFOSync(nfoPath, info);
      }}
      selectable
    />
  ) : (
    <div />
  );
};

export default connect(mapStateToProps)(MainContent);
