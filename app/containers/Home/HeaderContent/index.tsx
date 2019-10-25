import path from 'path';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Dropdown, Menu, message } from 'antd';
import { shell } from 'electron';
import * as R from 'ramda';
import CRD from '@vdts/collect-video';
import { generateFileTree, takeScreenshots } from '../../../utils';
import {
  selectFiles,
  setSelectedFilename,
  changeChecked,
  changeSelected,
  changeFailureKeys
} from '../../../actions/file';
import scrape, { getHeadsByMediaType, getRegularByMediaType } from '@scraper';
import config from '@config';

import ScrapeInfoModal from '../ScrapeInfoModal';
import SettingModal from '../SettingModal';

const { dialog } = require('electron').remote;

type Props = ReturnType<typeof mapStateToProps> & { dispatch };

const matchStr: (str: string, reg: RegExp) => string = (str, reg) => {
  const r = str.match(reg);
  return r ? (r[0] ? r[0] : str) : str;
};
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
  const [tasks, setTasks] = useState([]);
  const scraperHead = useRef('');
  useEffect(() => {
    if (tasks.length) {
      scrape.start(tasks, scraperHead.current);
    }
  }, [tasks]);
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
    const defaultHead = getHeadsByMediaType(config.get('scene'))[0];
    const regular = getRegularByMediaType(config.get('scene')) || /./;
    if (!defaultHead) {
      return message.error('当前场景未找到信息源');
    }
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
          queryString: matchStr(selectedFilename, regular),
          file
        }
      ];
    } else {
      _tasks = checkedKeys
        .map(key => {
          const file = flatTree[key];
          return {
            queryString: matchStr(file.title, regular),
            file
          };
        })
        .filter(v => !v.file.isDir);

      _taskQueue = _tasks.map(({ file }) => ({ file, status: 'unfired' }));
    }
    setModalVisible(true);
    setTaskQueue(_taskQueue);
    setTasks(_tasks);
    scraperHead.current = head;
  };
  const handleRebuild = () => {
    CRD(tree.wpath)
      .then(res => {
        const _tree = generateFileTree([tree.wpath]);
        dispatch(changeChecked([]));
        dispatch(changeSelected(''));
        dispatch(changeFailureKeys([]));
        dispatch(selectFiles(_tree[0]));
        message.success('格式化成功');
        return res;
      })
      .catch(e => {
        message.error('格式化失败');
        console.log(e);
      });
  };
  const menu = (
    <Menu
      onClick={e => {
        handleScrape(e.key);
      }}
    >
      {(getHeadsByMediaType(config.get('scene')) || []).map(head => (
        <Menu.Item key={head.name}>{head.name}</Menu.Item>
      ))}
    </Menu>
  );
  const inputDisabled = !!checkedKeys.length;
  const thumbnailsEnable = config.get('thumbnails').enable;
  return (
    <>
      <Row>
        <Col span={2}>
          <Button onClick={handleSelect}>选取文件</Button>
        </Col>
        <Col span={2}>
          <Button onClick={handleRebuild}>格式化目录</Button>
        </Col>
        <Col span={4}>
          <Input
            value={selectedFilename}
            placeholder="选择一个文件，直接或修改后爬取"
            disabled={inputDisabled}
            onChange={e => {
              handleInput(e.target.value);
            }}
          />
        </Col>
        <Col span={2}>
          <Button
            disabled={inputDisabled}
            onClick={() => {
              const file = flatTree[selectedKey];
              shell.openItem(file.fullpath);
            }}
          >
            播放文件
          </Button>
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
        {thumbnailsEnable ? (
          <Col span={4}>
            <Button
              onClick={() => {
                const setting = config.get('thumbnails');
                const promises = checkedKeys
                  .map(key => flatTree[key])
                  .filter(v => !v.isDir)
                  .map(file =>
                    takeScreenshots({
                      file: file.fullpath,
                      count: setting.count,
                      size: setting.size,
                      folder: path.join(file.wpath, '.thumbnails')
                    })
                  );
                Promise.all(promises)
                  .then(res => console.log(res))
                  .catch(err => {
                    message.error('生成截图失败，请确认ffmpeg是否可用');
                  });
              }}
            >
              生成帧截图
            </Button>
          </Col>
        ) : (
          ''
        )}
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
