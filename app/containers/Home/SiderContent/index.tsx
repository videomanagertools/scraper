import React from 'react';
import { connect } from 'react-redux';

import FolderViewer from '../../../components/FolderViewer/index';
import { changeChecked, changeSelected } from '../../../actions/file';

const mapStateToProps = ({ file }) => {
  const { trees, checkedKeys, selectedKey } = file;
  return {
    trees,
    checkedKeys,
    selectedKey
  };
};
const mapDispatchToProps = {
  onChecked: changeChecked,
  onSelected: changeSelected
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    trees: [];
  };
const SiderContent: React.FC<Props> = ({
  trees,
  onChecked,
  onSelected,
  checkedKeys,
  selectedKey
}) => {
  const selectHandle = (iselectedKeys: string[]) => {
    onSelected(iselectedKeys[0]);
  };
  const checkHandle = icheckedKeys => {
    onChecked(icheckedKeys);
  };
  return (
    <FolderViewer
      tree={trees}
      onSelect={selectHandle}
      onCheck={checkHandle}
      selectedKeys={[selectedKey]}
      checkedKeys={checkedKeys}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderContent);
