import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Dropdown, Menu } from 'antd';

import * as R from 'ramda';
import CRD from '@vdts/collect-video';
import { generateFileTree } from '../../../utils';
import {
  selectFiles,
  setSelectedFilename,
  changeChecked,
  changeSelected,
  changeFailureKeys
} from '../../../actions/file';
import scrape, { getHeadsByMediaType } from '@scraper';
import config from '@config';

import ScrapeInfoModal from '../ScrapeInfoModal';
import SettingModal from '../SettingModal';

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
  const [settingVisible, setSettingVisible] = useState(false);
  const [taskQueue, setTaskQueue] = useState([]);
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
        dispatch(changeChecked([]));
        dispatch(changeSelected(''));
        dispatch(changeFailureKeys([]));
        dispatch(selectFiles(_tree[0]));
      }
    );
  };
  const handleScrape = (headName?: string) => {
    dispatch(changeFailureKeys([]));
    const head = headName || getHeadsByMediaType(config.get('scene'))[0].name;
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
    scrape.start(_tasks, head);
  };
  const handleRebuild = () => {
    CRD(tree.wpath)
      .then(res => {
        const _tree = generateFileTree([tree.wpath]);
        dispatch(changeChecked([]));
        dispatch(changeSelected(''));
        dispatch(changeFailureKeys([]));
        dispatch(selectFiles(_tree[0]));
        return res;
      })
      .catch(e => {
        console.log(e);
      });
  };
  const menu = (
    <Menu
      onClick={e => {
        handleScrape(e.key);
      }}
    >
      {getHeadsByMediaType(config.get('scene')).map(head => (
        <Menu.Item key={head.name}>{head.name}</Menu.Item>
      ))}
    </Menu>
  );
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
            placeholder="选择一个文件，直接或修改后爬取"
            onChange={e => {
              handleInput(e.target.value);
            }}
          />
        </Col>
        <Col span={4} offset={1}>
          <Dropdown.Button
            onClick={() => {
              handleScrape();
            }}
            overlay={menu}
          >
            爬取信息
          </Dropdown.Button>
        </Col>
        <Col span={4}>
          <Button
            shape="circle"
            icon="setting"
            onClick={() => {
              setSettingVisible(true);
            }}
          />
        </Col>
      </Row>
      <ScrapeInfoModal
        visible={modalVisible}
        taskQueue={taskQueue}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
      <SettingModal
        visible={settingVisible}
        onCancle={() => setSettingVisible(false)}
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
