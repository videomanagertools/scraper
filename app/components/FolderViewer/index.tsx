import React from 'react';

import { Tree } from 'antd';
import { connect } from 'react-redux';
import { TreeType } from '../../types/index';
import * as styles from './index.less';

const { TreeNode } = Tree;
type Props = {
  tree: TreeType;
  onSelect?: (selectedKey: string[]) => void;
  onCheck?: (checkedKeys: string[]) => void;
  selectedKeys?: string[];
  checkedKeys?: string[];
};
class FileViewer extends React.Component<Props> {
  componentDidMount() {}

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            selectable={!item.isDir}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} selectable={!item.isDir} />;
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
