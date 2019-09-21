import React from 'react';
import { Row, Col, Tag } from 'antd';
import cn from 'classnames';
import styles from './index.less';

export default ({ currentMediaInfo }) => (
  <Row>
    <div className={styles.media_info}>
      <div className={styles.media_title}>{currentMediaInfo.title}</div>
      <Col span={8} offset={2}>
        <img
          style={{ maxWidth: '100%' }}
          src={currentMediaInfo.poster}
          alt=""
        />
      </Col>
      <Col span={12} offset={2}>
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
            {currentMediaInfo.genre &&
              currentMediaInfo.genre.map(g => <Tag key={g}>{g}</Tag>)}
          </div>
        </div>
        <div className={styles.info_item}>
          <div className={styles.info_label}>演员：</div>
          <div className={cn(styles.info_text, styles.actor)}>
            {currentMediaInfo.actor &&
              currentMediaInfo.actor.map(a => (
                <figure key={a.name}>
                  <img src={a.thumb} alt="" />
                  <figcaption key={a.name}>{a.name}</figcaption>
                </figure>
              ))}
          </div>
        </div>
      </Col>
    </div>
  </Row>
);
