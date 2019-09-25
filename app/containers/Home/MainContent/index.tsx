import React from 'react';
import path from 'path';
import { connect } from 'react-redux';
import MediaInfo from '@components/MediaInfo';
import { readMediaInfoByNFOSync } from '@utils';

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
  let mediaInfo = null;
  if (selectedKey) {
    const node = flatTree[selectedKey];
    const nfo = path.join(node.wpath, `${node.title}.nfo`);
    try {
      mediaInfo = readMediaInfoByNFOSync(nfo);
    } catch (error) {
      console.info('no nfo file');
    }
    console.log(mediaInfo);
  }
  return mediaInfo ? <MediaInfo currentMediaInfo={mediaInfo} /> : <div />;
};

export default connect(mapStateToProps)(MainContent);
