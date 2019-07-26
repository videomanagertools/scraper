import React, { useState } from 'react';
import { connect } from 'react-redux';

import FolderViewer from '../../../components/FolderViewer/index';
import { changeChecked, changeSelected } from '../../../actions/file';

const mapStateToProps = ({ file }) => {
  const { trees } = file;
  return {
    trees
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
const SiderContent: React.FC<Props> = ({ trees, onChecked, onSelected }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const selectHandle = (iselectedKeys: string[]) => {
    setSelectedKeys(iselectedKeys);
    onSelected(iselectedKeys[0]);
  };
  const checkHandle = icheckedKeys => {
    setCheckedKeys(icheckedKeys);
    onChecked(icheckedKeys);
  };
  return (
    <FolderViewer
      tree={trees}
      onSelect={selectHandle}
      onCheck={checkHandle}
      selectedKeys={selectedKeys}
      checkedKeys={checkedKeys}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderContent);
