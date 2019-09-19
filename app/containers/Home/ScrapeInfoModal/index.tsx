import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Modal, Timeline, Icon } from 'antd';
import { emitter } from '../../../utils';
import { EventType } from '@types';
import { stop } from '../../../scraper/core';

export default ({ visible, taskQueue, onCancel }) => {
  const [currentMediaInfo, setCurrentMediaInfo] = useState({
    poster: 'https://image.tmdb.org/t/p/w500/uXTtUYleKiaF0KuBwupIeuSjyLA.jpg',
    title: '哪吒之魔童降世',
    premiered: '2019-04-24',
    actor: [
      {
        name: 'Yanting Lv',
        thumb: 'https://image.tmdb.org/t/p/w185/vKpOzPutTaPf03rWXiLuK8R2K3B.jpg'
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
      setCurrentMediaInfo({ ...json, poster: json.art.poster });
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
      onCancel();
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
      width="100%"
      footer={null}
      onCancel={handleModalCancel}
      visible={visible}
      maskClosable={false}
      keyboard={false}
      title="检索信息中"
    >
      <Row>
        <Col span={5}>
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
  );
};
