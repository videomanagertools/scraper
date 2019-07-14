import React from 'react';
import { connect } from 'react-redux';

import FolderViewer from '../../../components/FolderViewer/index';

const mapStateToProps = ({ fileViewer }: any) => {
  const { trees } = fileViewer;
  return {
    trees
  };
};
type Props = ReturnType<typeof mapStateToProps> & {
  trees: [];
};
const SiderContent: React.FC<Props> = ({ trees }) => (
  <FolderViewer tree={trees} />
);

export default connect(mapStateToProps)(SiderContent);
