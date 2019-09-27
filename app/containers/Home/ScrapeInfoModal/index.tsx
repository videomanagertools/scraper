import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, Timeline, Icon } from 'antd';
import MediaInfo from '@components/MediaInfo';
import { emitter } from '../../../utils';
import { EventType } from '@types';
import scraper from '../../../scraper';
import * as styles from './index.less';
import { changeFailureKeys } from '../../../actions/file';

const ScrapeModal = ({ visible, taskQueue, onCancel, handleTaskEnd }) => {
  const [currentMediaInfo, setCurrentMediaInfo] = useState({
    poster: 'https://image.tmdb.org/t/p/w500/uXTtUYleKiaF0KuBwupIeuSjyLA.jpg',
    title: 'def',
    premiered: '2019-04-24',
    actor: [
      {
        name: 'Yanting Lvasdsdda asdas',
        thumb:
          'https://image.tmdb.org/t/p/w138_and_h175_face/vKpOzPutTaPf03rWXiLuK8R2K3B.jpg'
      },
      {
        name: 'asdasd',
        thumb:
          'https://image.tmdb.org/t/p/w138_and_h175_face/58Ytg6PBGpqB2s7DkHB82dRvdFO.jpg'
      }
    ],
    genre: [],
    uniqueid: []
  });
  const [taskQ, setTaskQ] = useState([]);
  const [taskIsEnd, setTaskIsEnd] = useState(false);
  const lastTaskQ = useRef(taskQ);
  useEffect(() => {
    setTaskQ(taskQueue);
    lastTaskQ.current = taskQueue;
  }, [taskQueue]);
  useEffect(() => {
    console.log(44);
    emitter.on(EventType.SCRAPE_PENDING, ({ key }, str) => {
      console.log(33);
      const _taskQ = lastTaskQ.current.map(task => ({
        ...task,
        status: task.file.key === key ? 'pending' : task.status,
        str: task.file.key === key ? str : task.str ? task.str : ''
      }));
      setTaskQ(_taskQ);
      lastTaskQ.current = _taskQ;
    });
    emitter.on(EventType.SCRAPE_SUCCESS, ({ key }, json) => {
      const _taskQ = lastTaskQ.current.map(task => ({
        ...task,
        status: task.file.key === key ? 'success' : task.status
      }));
      setTaskQ(_taskQ);
      lastTaskQ.current = _taskQ;
      setCurrentMediaInfo({
        ...json,
        uniqueid: json.uniqueid[0]
      });
    });
    emitter.on(EventType.SCRAPE_FAIL, ({ key }) => {
      const _taskQ = lastTaskQ.current.map(task => ({
        ...task,
        status: task.file.key === key ? 'fail' : task.status
      }));
      setTaskQ(_taskQ);
      lastTaskQ.current = _taskQ;
    });
    emitter.on(EventType.SCRAPE_TASK_END, ({ successTasks, failureTasks }) => {
      console.log(successTasks, failureTasks);
      handleTaskEnd(failureTasks.map(task => task.key));
      setTaskIsEnd(true);
    });
    return () => {
      emitter.removeAllListeners(EventType.SCRAPE_FAIL);
      emitter.removeAllListeners(EventType.SCRAPE_PENDING);
      emitter.removeAllListeners(EventType.SCRAPE_SUCCESS);
      emitter.removeAllListeners(EventType.SCRAPE_TASK_END);
    };
  }, []);
  const handleModalCancel = e => {
    if (taskIsEnd) {
      return onCancel();
    }
    Modal.confirm({
      title: '确认关闭吗',
      onOk: () => {
        scraper.stop();
        onCancel();
      }
    });
  };
  return (
    <Modal
      width="90%"
      footer={null}
      onCancel={handleModalCancel}
      visible={visible}
      maskClosable={false}
      keyboard={false}
      title="检索信息中"
      className={styles.scrape_info_modal}
    >
      <Row>
        <Col span={5} className={styles.left_sider}>
          <Timeline>
            {taskQ.map(({ file, status, str }) => {
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
                  <div>{file.title}</div>
                  <div style={{ color: '#CC0000' }}>关键字：{str}</div>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Col>
        <Col span={18} style={{ position: 'sticky', top: 100 }}>
          {currentMediaInfo.title === 'def' ? (
            ''
          ) : (
            <MediaInfo currentMediaInfo={currentMediaInfo} />
          )}
        </Col>
      </Row>
    </Modal>
  );
};
const mapDispatchToProps = {
  handleTaskEnd: changeFailureKeys
};
export default connect(
  null,
  mapDispatchToProps
)(ScrapeModal);
