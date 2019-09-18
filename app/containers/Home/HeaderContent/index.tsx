import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input, Checkbox, Modal, Timeline, Icon } from 'antd';
import * as R from 'ramda';
import { generateFileTree, emitter } from '../../../utils';
import { selectFiles, setSelectedFilename } from '../../../actions/file';
import scrape, { stop } from '../../../scraper/core';
import { EventType } from '@types';

const { dialog } = require('electron').remote;

type Props = ReturnType<typeof mapStateToProps> & { dispatch };
class HeaderContent extends Component<Props> {
  state = {
    isBatch: false,
    modalVisible: false,
    taskQueue: [],
    taskIsEnd: false,
    total: 0,
    successCount: 0,
    failureCount: 0,
    currentMediaInfo: {
      poster: 'https://image.tmdb.org/t/p/w500/uXTtUYleKiaF0KuBwupIeuSjyLA.jpg',
      title: '哪吒之魔童降世',
      premiered: '2019-04-24',
      actor: [
        {
          name: 'Yanting Lv',
          thumb:
            'https://image.tmdb.org/t/p/w185/vKpOzPutTaPf03rWXiLuK8R2K3B.jpg'
        }
      ],
      genre: ['动画', '奇幻'],
      uniqueid: '615453'
    }
  };

  componentDidMount() {
    // 只有一个页面，所以不用手动移除监听器
    emitter.on(EventType.SCRAPE_PENDING, ({ key }, str) => {
      const { taskQueue } = this.state;
      this.setState({
        taskQueue: taskQueue.map(task => ({
          ...task,
          status: task.file.key === key ? 'pending' : task.status,
          str: task.file.key === key ? str : task.str ? task.str : ''
        }))
      });
    });
    emitter.on(EventType.SCRAPE_SUCCESS, ({ key }, json) => {
      const { taskQueue } = this.state;
      this.setState({
        taskQueue: taskQueue.map(task => ({
          ...task,
          status: task.file.key === key ? 'success' : task.status
        })),
        currentMediaInfo: {
          ...json,
          poster: json.art.poster
        }
      });
    });
    emitter.on(EventType.SCRAPE_FAIL, ({ key }) => {
      const { taskQueue } = this.state;
      this.setState({
        taskQueue: taskQueue.map(task => ({
          ...task,
          status: task.file.key === key ? 'fail' : task.status
        }))
      });
    });
    emitter.on(EventType.SCRAPE_TASK_END, ({ successTasks, failureTasks }) => {
      this.setState({
        taskIsEnd: true,
        successCount: successTasks.length,
        failureCount: failureTasks.length
      });
    });
  }

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
      if (!selectedFilename) {
        return;
      }
      const file = flatTrees[selectedKey];
      this.setState(
        {
          modalVisible: true,
          taskQueue: [{ file, status: 'unfired' }],
          taskIsEnd: false
        },
        () => {
          scrape([
            {
              queryString: selectedFilename,
              file
            }
          ]);
        }
      );
    } else {
      const tasks = checkedKeys
        .map(key => {
          const file = flatTrees[key];
          return {
            queryString: file.title,
            file
          };
        })
        .filter(v => !v.file.isDir);
      this.setState(
        {
          modalVisible: true,
          taskQueue: tasks.map(({ file }) => ({ file, status: 'unfired' })),
          taskIsEnd: false
        },
        () => {
          scrape(tasks);
        }
      );
    }
  };

  handleModalCancel = e => {
    const { taskIsEnd } = this.state;
    if (taskIsEnd) {
      return this.setState({
        modalVisible: false
      });
    }
    Modal.confirm({
      title: '确认关闭吗',
      onOk: () => {
        stop();
        this.setState({
          modalVisible: false
        });
      }
    });
  };

  render() {
    const { selectedFilename } = this.props;
    const {
      isBatch,
      modalVisible,
      taskQueue,
      successCount,
      failureCount,
      total,
      currentMediaInfo
    } = this.state;
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
        <Modal
          width="100%"
          footer={null}
          onCancel={this.handleModalCancel}
          visible={modalVisible}
          maskClosable={false}
          keyboard={false}
          title="检索信息中"
        >
          一共运行了{total}个任务，成功{successCount}个，失败{failureCount}个
          <Row>
            <Col span={5}>
              <Timeline>
                {taskQueue.map(({ file, status, str }) => {
                  const dot =
                    status === 'pending' ? (
                      <Icon style={{ fontSize: 18 }} type="sync" spin />
                    ) : status === 'unfired' ? (
                      ''
                    ) : status === 'success' ? (
                      <Icon
                        style={{ fontSize: 18 }}
                        type="smile"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                    ) : (
                      <Icon
                        style={{ fontSize: 18 }}
                        type="frown"
                        theme="twoTone"
                        twoToneColor="#eb2f96"
                      />
                    );
                  return (
                    <Timeline.Item
                      dot={dot}
                      color={status === 'unfired' ? 'gray' : 'blue'}
                      key={file.key}
                    >
                      {file.title}
                      <span style={{ color: 'red' }}>{str}</span>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </Col>
            <Col span={18} offset={1}>
              <Row>
                <Col span={5}>
                  <img
                    style={{ maxWidth: '100%' }}
                    src={currentMediaInfo.poster}
                    alt=""
                  />
                </Col>
                <Col span={10} offset={2}>
                  <div className="genre" style={{ display: 'flex' }}>
                    {currentMediaInfo.genre.map(g => (
                      <div key={g}>{g}</div>
                    ))}
                  </div>
                  <div className="actor">
                    {currentMediaInfo.actor.map(a => (
                      <div key={a.name}>{a.name}</div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = ({ file }) => {
  const { checkedKeys, selectedFilename, selectedKey, flatTrees, trees } = file;
  return {
    checkedKeys,
    selectedFilename,
    selectedKey,
    flatTrees,
    trees
  };
};
export default connect(mapStateToProps)(HeaderContent);
