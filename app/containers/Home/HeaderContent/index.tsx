import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Checkbox } from 'antd';
import * as R from 'ramda';
import { generateFileTree } from '../../../utils';
import { selectFiles, setSelectedFilename } from '../../../actions/file';
import scrape from '../../../scraper/core';

const { dialog } = require('electron').remote;

type Props = ReturnType<typeof mapStateToProps> & { dispatch };
class HeaderContent extends Component<Props> {
  state = {
    isBatch: false
  };

  handleSelect = () => {
    const { dispatch } = this.props;
    dialog.showOpenDialog(
      {
        title: 'Select',
        properties: ['openDirectory', 'openFile', 'multiSelections']
      },
      filePaths => {
        if (!R.is(Array, filePaths) || R.isEmpty(filePaths)) return;
        const trees = generateFileTree(filePaths);
        dispatch(selectFiles(trees));
      }
    );
  };

  handleInput = filename => {
    const { dispatch } = this.props;
    dispatch(setSelectedFilename(filename));
  };

  handleScrape = async () => {
    const {
      checkedKeys,
      selectedFilename,
      selectedKey,
      flatTrees
    } = this.props;
    if (!checkedKeys.length) {
      await scrape([
        {
          queryString: selectedFilename,
          file: flatTrees[selectedKey]
        }
      ]);
    } else {
      await scrape(
        checkedKeys
          .map(key => {
            const file = flatTrees[key];
            return {
              queryString: file.title,
              file
            };
          })
          .filter(v => !v.file.isDir)
      ).catch(error => {
        console.log(error);
      });
    }
  };

  render() {
    const { selectedFilename } = this.props;
    const { isBatch } = this.state;
    return (
      <>
        <Row>
          <Col span={4}>
            <Button onClick={this.handleSelect}>选取文件</Button>
          </Col>
          <Col span={6}>
            <Input
              value={selectedFilename}
              placeholder="输入文件名，或者选择一个文件"
              onChange={e => {
                this.handleInput(e.target.value);
              }}
            />
          </Col>
          <Col span={4} offset={1}>
            <Checkbox
              style={{ color: '#fff' }}
              checked={isBatch}
              onChange={() => {
                this.setState({ isBatch: !isBatch });
              }}
            >
              批处理
            </Checkbox>
          </Col>
          <Col span={4} offset={1}>
            <Button onClick={() => this.handleScrape()}>爬取信息</Button>
          </Col>
          <Col span={4}>
            <Button onClick={this.handleSelect}>写入信息</Button>
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = ({ file }) => {
  const { checkedKeys, selectedFilename, selectedKey, flatTrees } = file;
  return {
    checkedKeys,
    selectedFilename,
    selectedKey,
    flatTrees
  };
};
export default connect(mapStateToProps)(HeaderContent);
