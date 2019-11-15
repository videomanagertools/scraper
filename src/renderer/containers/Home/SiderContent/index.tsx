import React, { useState } from "react";
import { connect } from "react-redux";
import { Select, Row, Col, Button } from "antd";
import { move, mkdirp } from "fs-extra";
import path from "path";
import FolderViewer from "../../../components/FolderViewer/index";
import { changeChecked, changeSelected } from "../../../actions/file";
import { IFileNode } from "@types";

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
    tree: IFileNode;
  };

enum OptionValue {
  movefail = "movefail"
}
const SiderContent = ({
  tree,
  onChecked,
  onSelected,
  checkedKeys,
  selectedKey,
  failureKeys,
  flatTree
}: Props) => {
  const [instruction, setInstruction] = useState(null);
  const selectHandle = (iselectedKeys: string[]) => {
    onSelected(iselectedKeys[0]);
  };
  const checkHandle = icheckedKeys => {
    onChecked(icheckedKeys);
  };
  const handleChange = (val: string) => {
    setInstruction(val);
  };
  const handleExec = async () => {
    const failPath = path.join(tree.wpath, "Fail");
    switch (instruction) {
      case OptionValue.movefail:
        await Promise.all([
          mkdirp(failPath),
          ...failureKeys.map(key => {
            const src = flatTree[key].fullpath;
            const dest = path.join(
              failPath,
              `${flatTree[key].title}.${flatTree[key].ext}`
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
            placeholder="有失败任务时可选择操作"
            style={{ width: "100%" }}
            onChange={handleChange}
            disabled={!failureKeys.length}
          >
            <Option value={OptionValue.movefail}>
              将失败的文件移动到Fail文件夹
            </Option>
          </Select>
        </Col>
        <Col span={4} offset={1}>
          {instruction ? (
            <Button type="primary" onClick={handleExec}>
              执行
            </Button>
          ) : (
            ""
          )}
        </Col>
      </Row>
      {tree.key === "def" ? (
        ""
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

export default connect(mapStateToProps, mapDispatchToProps)(SiderContent);
