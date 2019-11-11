import path from 'path';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Dropdown, Menu, message } from 'antd';
import { shell } from 'electron';
import * as R from 'ramda';
import CRD from '@vdts/collect-video';
import promiseThrottle from '@lib/promiseThrottle';
import ProgressModal from '@components/progressModal';
import ToolTipIcon from '@components/toolTipIcon';
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
// After the setting related operation uses redux refactoring, consider the open concurrency setting option.
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
  const handleThumbnails = () => {
    const setting = config.get('thumbnails');
    const promises = checkedKeys
      .map(key => flatTree[key])
      .filter(v => !v.isDir)
      .map(file => ({
        task: takeScreenshots,
        arguments: [
          {
            file: file.fullpath,
            count: setting.count,
            size: setting.size,
            folder: path.join(file.wpath, '.thumbnails')
          }
        ]
      }));
    const total = promises.length;
    ProgressModal.show({
      progress: {
        percent: +((setting.parallel / total) * 100).toFixed(0),
        successPercent: 0,
        total
      },
      modal: {
        title: getTitle(
          getProgress(total - setting.parallel, setting.parallel, total)
        )
      }
    });
    promiseThrottle(promises, {
      concurrency: setting.parallel,
      onRes: limit => {
        const { activeCount, pendingCount } = limit;
        const progress = getProgress(pendingCount, activeCount, total);
        console.log(limit.activeCount, limit.pendingCount, getTitle(progress));
        ProgressModal.update({
          progress,
          modal: {
            title: getTitle(progress)
          }
        });
      }
    })
      .then(res =>
        setTimeout(() => {
          ProgressModal.destroy();
        }, 2000)
      )
      .catch(err => {});
    function getTitle(progress) {
      return `${Math.round(
        (progress.successPercent / 100) * progress.total
      )}已完成 / ${Math.round(
        ((progress.percent - progress.successPercent) / 100) * progress.total
      )}运行中 / ${Math.round(
        ((100 - progress.percent) / 100) * progress.total
      )}等待中`;
    }
    function getProgress(
      pendingCount: number,
      activeCount: number,
      itotal: number
    ) {
      return {
        percent: +(((itotal - pendingCount) / itotal) * 100).toFixed(0),
        successPercent: +(
          ((itotal - pendingCount - activeCount) / itotal) *
          100
        ).toFixed(0),
        total: itotal
      };
    }
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
  const inputDisabled = !!checkedKeys.length || !selectedKey;
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
        <Col span={1}>
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
        <Col span={1}>
          <ToolTipIcon
            content="select文件时且没有节点被checked的时候，输入框和按钮可用"
            style={{
              fontSize: 22,
              display: 'inline-block',
              verticalAlign: ' middle',
              marginLeft: 10
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
        {thumbnailsEnable ? (
          <Col span={4}>
            <Button onClick={handleThumbnails}>生成帧截图</Button>
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
        source={scraperHead.current}
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
