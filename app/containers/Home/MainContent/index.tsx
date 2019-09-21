import React from 'react';
// import path from 'path';
import { connect } from 'react-redux';
// import MediaInfo from '@components/MediaInfo';
// import { readMediaInfoByNFOSync, xml2js } from '@utils';
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
const MainContent = () => (
  // todo 数据回显
  // let mediaInfo = {};
  // if (selectedKey) {
  //   let node = flatTree[selectedKey];
  //   let nfo = path.join(node.wpath, node.title + '.nfo');
  //   mediaInfo = xml2js(readMediaInfoByNFOSync(nfo));
  //   console.log(mediaInfo);
  // }
  // return <MediaInfo currentMediaInfo={mediaInfo} />;
  <div />
);

export default connect(mapStateToProps)(MainContent);
