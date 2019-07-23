import React from 'react';

import { Tree } from 'antd';
import { connect } from 'react-redux';
import * as styles from './index.less';

const { TreeNode } = Tree;
export type TreeType = {
  title: string;
  key: string;
  children: TreeType[];
}[];
export interface SelectHandle {
  (selectedKey: string[]): void;
}
export interface CheckHandle {
  (checkedKeys: string[]): void;
}
type Props = {
  tree: TreeType;
  onSelect?: SelectHandle;
  onCheck?: CheckHandle;
  selectedKeys?: string[];
  checkedKeys?: string[];
};
class FileViewer extends React.Component<Props> {
  componentDidMount() {}

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const { onCheck, onSelect, selectedKeys, checkedKeys, tree } = this.props;
    return (
      <div className={styles.wrapper}>
        <Tree
          checkable
          defaultExpandAll
          autoExpandParent
          onCheck={onCheck}
          onSelect={onSelect}
          checkedKeys={checkedKeys}
          selectedKeys={selectedKeys}
        >
          {this.renderTreeNodes(tree)}
        </Tree>
      </div>
    );
  }
}

export default connect()(FileViewer);
