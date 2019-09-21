import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input } from 'antd';
import * as R from 'ramda';
import CRD from '@vdts/collect-video';
import { generateFileTree } from '../../../utils';
import {
  selectFiles,
  setSelectedFilename,
  changeChecked,
  changeSelected
} from '../../../actions/file';
import scrape from '../../../scraper/core';

import ScrapeInfoModal from '../ScrapeInfoModal';

const { dialog } = require('electron').remote;

type Props = ReturnType<typeof mapStateToProps> & { dispatch };

const HeaderContent = ({
  checkedKeys,
  selectedFilename,
  selectedKey,
  flatTree,
  tree,
  dispatch
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskQueue, setTaskQueue] = useState([]);
  const [tasks, setTasks] = useState([]);
  const handleInput = filename => {
    dispatch(setSelectedFilename(filename));
  };
  const handleSelect = () => {
    dialog.showOpenDialog(
      {
        title: 'Select',
        properties: ['openDirectory']
      },
      filePaths => {
        if (!R.is(Array, filePaths) || R.isEmpty(filePaths)) return;
        const _tree = generateFileTree(filePaths);
        dispatch(selectFiles(_tree[0]));
      }
    );
  };
  const handleScrape = () => {
    let _taskQueue = [];
    let _tasks = [];
    if (!checkedKeys.length) {
      if (!selectedFilename) {
        return;
      }
      const file = flatTree[selectedKey];

      _taskQueue = [{ file, status: 'unfired' }];

      _tasks = [
        {
          queryString: selectedFilename,
          file
        }
      ];
    } else {
      _tasks = checkedKeys
        .map(key => {
          const file = flatTree[key];
          return {
            queryString: file.title,
            file
          };
        })
        .filter(v => !v.file.isDir);

      _taskQueue = _tasks.map(({ file }) => ({ file, status: 'unfired' }));
    }
    setModalVisible(true);
    setTaskQueue(_taskQueue);
    setTasks(_tasks);
  };
  const handleRebuild = () => {
    CRD(tree.wpath)
      .then(res => {
        const _tree = generateFileTree([tree.wpath]);
        dispatch(selectFiles(_tree[0]));
        dispatch(changeChecked([]));
        dispatch(changeSelected(''));
        return res;
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (tasks.length) {
      console.log('out effect');
      scrape(tasks.map(task => task));
    }
  }, [tasks]);
  return (
    <>
      <Row>
        <Col span={2}>
          <Button onClick={handleSelect}>选取文件</Button>
        </Col>
        <Col span={2}>
          <Button onClick={handleRebuild}>格式化目录</Button>
        </Col>
        <Col span={6}>
          <Input
            value={selectedFilename}
            placeholder="输入文件名，或者选择一个文件"
            onChange={e => {
              handleInput(e.target.value);
            }}
          />
        </Col>
        <Col span={4} offset={1}>
          <Button onClick={() => handleScrape()}>爬取信息</Button>
        </Col>
        <Col span={4}>
          <Button onClick={handleSelect}>写入信息</Button>
        </Col>
      </Row>
      <ScrapeInfoModal
        visible={modalVisible}
        taskQueue={taskQueue}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};
const mapStateToProps = ({ file }) => {
  const { checkedKeys, selectedFilename, selectedKey, flatTree, tree } = file;
  return {
    checkedKeys,
    selectedFilename,
    selectedKey,
    flatTree,
    tree
  };
};
export default connect(mapStateToProps)(HeaderContent);
