import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input } from 'antd';
const { dialog } = require('electron').remote;
import * as R from 'ramda';
import { generateFileTree } from '../../../utils';
import { selectFiles } from '../../../actions/fileViewer';
function Header({ setTree, dispatch, checkedKeys }) {
  function handleSelect(paths) {
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
  }

  const [filename, setFilename] = useState('');

  return (
    <>
      <Row>
        <Col span={4}>
          <Button onClick={handleSelect}>选取文件</Button>
        </Col>
        <Col span={6}>
          <Input
            value={filename}
            placeholder="输入文件名，或者选择一个文件"
            onChange={e => {
              setFilename(e.target.value);
            }}
          />
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={handleSelect}>爬取信息</Button>
        </Col>
        <Col span={4}>
          <Button onClick={handleSelect}>写入信息</Button>
        </Col>
      </Row>
    </>
  );
}
const mapStateToProps = ({ fileViewer }) => {
  const { checkedKeys } = fileViewer;
  return {
    checkedKeys
  };
};

export default connect(mapStateToProps)(Header);
