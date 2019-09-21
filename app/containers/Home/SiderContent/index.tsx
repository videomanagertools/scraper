import React from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col, Button } from 'antd';
import FolderViewer from '../../../components/FolderViewer/index';
import { changeChecked, changeSelected } from '../../../actions/file';

const { Option } = Select;

const mapStateToProps = ({ file }) => {
  const { trees, checkedKeys, selectedKey, failureKeys } = file;
  return {
    trees,
    checkedKeys,
    selectedKey,
    failureKeys
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

enum OptionValue {
  movefail = 'movefail'
}
const SiderContent: React.FC<Props> = ({
  trees,
  onChecked,
  onSelected,
  checkedKeys,
  selectedKey,
  failureKeys
}) => {
  const selectHandle = (iselectedKeys: string[]) => {
    onSelected(iselectedKeys[0]);
  };
  const checkHandle = icheckedKeys => {
    onChecked(icheckedKeys);
  };
  const handleChange = (val: string) => {
    // switch (val) {
    //   case OptionValue.onlyfail:
    // }
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
      <FolderViewer
        tree={trees}
        onSelect={selectHandle}
        onCheck={checkHandle}
        selectedKeys={[selectedKey]}
        checkedKeys={checkedKeys}
        filterKeys={failureKeys}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderContent);
