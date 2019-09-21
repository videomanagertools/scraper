import React from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col, Button } from 'antd';
import { move, mkdirp } from 'fs-extra';
import path from 'path';
import FolderViewer from '../../../components/FolderViewer/index';
import { changeChecked, changeSelected } from '../../../actions/file';
import { TreeType } from '@types';

const { Option } = Select;

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
const mapDispatchToProps = {
  onChecked: changeChecked,
  onSelected: changeSelected
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    tree: TreeType;
  };

enum OptionValue {
  movefail = 'movefail'
}
const SiderContent: React.FC<Props> = ({
  tree,
  onChecked,
  onSelected,
  checkedKeys,
  selectedKey,
  failureKeys,
  flatTree
}) => {
  const selectHandle = (iselectedKeys: string[]) => {
    onSelected(iselectedKeys[0]);
  };
  const checkHandle = icheckedKeys => {
    onChecked(icheckedKeys);
  };
  const handleChange = async (val: string) => {
    const failPath = path.join(tree.wpath, 'Fail');
    switch (val) {
      case OptionValue.movefail:
        await Promise.all([
          mkdirp(failPath),
          ...failureKeys.map(key => {
            const src = flatTree[key].fullpath;
            const dest = path.join(
              failPath,
              flatTree[key].title + flatTree[key].ext
            );
            return src === dest ? Promise.resolve() : move(src, dest);
          })
        ]);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Row>
        <Col span={18}>
          <Select
            placeholder="选择操作"
            style={{ width: '100%' }}
            onChange={handleChange}
          >
            <Option value={OptionValue.movefail}>
              将失败的文件移动到Fail文件夹
            </Option>
          </Select>
        </Col>
        <Col span={4} offset={1}>
          <Button type="primary">执行</Button>
        </Col>
      </Row>
      {tree.key === 'def' ? (
        ''
      ) : (
        <FolderViewer
          tree={tree}
          onSelect={selectHandle}
          onCheck={checkHandle}
          selectedKeys={[selectedKey]}
          checkedKeys={checkedKeys}
          filterKeys={failureKeys}
        />
      )}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderContent);
