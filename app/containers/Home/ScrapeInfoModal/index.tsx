import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, Timeline, Icon, Tag } from 'antd';
import cn from 'classnames';
import { emitter } from '../../../utils';
import { EventType } from '@types';
import { stop } from '../../../scraper/core';
import * as styles from './index.less';
import { changeFailureKeys } from '../../../actions/file';

const ScrapeModal = ({ visible, taskQueue, onCancel, handleTaskEnd }) => {
  const [currentMediaInfo, setCurrentMediaInfo] = useState({
    poster: 'https://image.tmdb.org/t/p/w500/uXTtUYleKiaF0KuBwupIeuSjyLA.jpg',
    title: '哪吒之魔童降世',
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
    genre: ['动画', '奇幻'],
    uniqueid: '615453'
  });
  const [taskQ, setTaskQ] = useState([]);
  const [taskIsEnd, setTaskIsEnd] = useState(false);
  const lastTaskQ = useRef(taskQ);
  useEffect(() => {
    setTaskQ(taskQueue);
    lastTaskQ.current = taskQueue;
  }, [taskQueue]);
  useEffect(() => {
    emitter.on(EventType.SCRAPE_PENDING, ({ key }, str) => {
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
        poster: json.art.poster,
        uniqueid: json.uniqueid[0]._text
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
      handleTaskEnd(failureTasks.map(task => task.file.key));
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
        stop();
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
        <Col span={18} offset={1} style={{ position: 'sticky', top: 100 }}>
          <Row>
            <div className={styles.media_title}>{currentMediaInfo.title}</div>
            <Col span={8}>
              <img
                style={{ maxWidth: '100%' }}
                src={currentMediaInfo.poster}
                alt=""
              />
            </Col>
            <Col span={12} offset={2} className={styles.media_info}>
              <div className={styles.info_item}>
                <div className={styles.info_label}>ID：</div>
                <div className={cn(styles.info_text, styles.uniqueid)}>
                  {currentMediaInfo.uniqueid}
                </div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_label}>发行日期：</div>
                <div className={cn(styles.info_text)}>
                  {currentMediaInfo.premiered}
                </div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_label}>类型：</div>
                <div className={cn(styles.info_text, styles.genre)}>
                  {currentMediaInfo.genre.map(g => (
                    <Tag key={g}>{g}</Tag>
                  ))}
                </div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_label}>演员：</div>
                <div className={cn(styles.info_text, styles.actor)}>
                  {currentMediaInfo.actor.map(a => (
                    <figure key={a.name}>
                      <img src={a.thumb} alt="" />
                      <figcaption key={a.name}>{a.name}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
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
