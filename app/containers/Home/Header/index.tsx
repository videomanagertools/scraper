import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input } from 'antd';
const { dialog } = require('electron').remote;
import * as R from 'ramda';
import { generateFileTree } from '../../../utils';
import { selectFiles } from '../../../actions/fileViewer';

type Props = {
  setTree;
  dispatch;
  checkedKeys;
};
class Header extends Component<Props> {
  state = {
    filename: ''
  };
  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps);
    if (nextProps.selectedFilename) {
      return {
        filename: nextProps.selectedFilename
      };
    }
    return null;
  }
  handleSelect = paths => {
    const { setTree, dispatch } = this.props;
    dialog.showOpenDialog(
      {
        title: 'Select',
        properties: ['openDirectory', 'openFile', 'multiSelections']
      },
      filePaths => {
        if (!R.is(Array, filePaths) || R.isEmpty(filePaths)) return;
        let trees = generateFileTree(filePaths);
        setTree(trees);
        dispatch(selectFiles(trees));
      }
    );
  };
  handleInput = filename => {
    this.setState({
      filename
    });
  };
  render() {
    const { filename } = this.state;
    return (
      <>
        <Row>
          <Col span={4}>
            <Button onClick={this.handleSelect}>选取文件</Button>
          </Col>
          <Col span={6}>
            <Input
              value={filename}
              placeholder="输入文件名，或者选择一个文件"
              onChange={e => {
                this.handleInput(e.target.value);
              }}
            />
          </Col>
          <Col span={4} offset={1}>
            <Button onClick={this.handleSelect}>爬取信息</Button>
          </Col>
          <Col span={4}>
            <Button onClick={this.handleSelect}>写入信息</Button>
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = ({ fileViewer }) => {
  const { checkedKeys, selectedFilename } = fileViewer;
  return {
    checkedKeys,
    selectedFilename
  };
};

export default connect(mapStateToProps)(Header);
