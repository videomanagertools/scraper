import React from "react";

import { Tree } from "antd";
import { IFileNode } from "../../types/index";
import styles from "./index.less";

const { TreeNode } = Tree;
type Props = {
  tree: IFileNode;
  onSelect?: (selectedKey: string[]) => void;
  onCheck?: (checkedKeys: string[]) => void;
  selectedKeys?: string[];
  checkedKeys?: string[];
  filterKeys?: string[];
  onlyShow?: boolean;
};
class FileViewer extends React.Component<Props> {
  renderTreeNodes = data => {
    if (data.children) {
      return (
        <TreeNode title={data.title} key={data.key} dataRef={data}>
          {data.children.map(v => this.renderTreeNodes(v))}
        </TreeNode>
      );
    }
    return <TreeNode {...data} title={`${data.title}.${data.ext}`} />;
  };

  filerNode = node => {
    const { filterKeys = [] } = this.props;
    return (
      filterKeys.findIndex(
        v =>
          v.indexOf(`${node.props.eventKey}-`) === 0 ||
          v === node.props.eventKey
      ) !== -1
    );
  };

  render() {
    const { onCheck, onSelect, selectedKeys, checkedKeys, tree } = this.props;
    return (
      <div className={styles.wrapper}>
        <Tree
          checkable
          defaultExpandedKeys={["0-0"]}
          autoExpandParent
          onCheck={onCheck}
          onSelect={onSelect}
          checkedKeys={checkedKeys}
          selectedKeys={selectedKeys}
          filterTreeNode={this.filerNode}
        >
          {this.renderTreeNodes(tree)}
        </Tree>
      </div>
    );
  }
}

export default FileViewer;
