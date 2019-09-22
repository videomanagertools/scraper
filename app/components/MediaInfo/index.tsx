import React from 'react';
import { Row, Col, Tag } from 'antd';
import cn from 'classnames';
import styles from './index.less';

export default ({ currentMediaInfo }) => (
  <Row>
    <div className={styles.media_info}>
      <div className={styles.media_title}>{currentMediaInfo.title._text}</div>
      <Col span={8} offset={2}>
        <img
          style={{ maxWidth: '100%' }}
          src={currentMediaInfo.art && currentMediaInfo.art.poster._text}
          alt=""
        />
      </Col>
      <Col span={12} offset={2}>
        <div className={styles.info_item}>
          <div className={styles.info_label}>ID：</div>
          <div className={cn(styles.info_text, styles.uniqueid)}>
            {currentMediaInfo.uniqueid._text}
          </div>
        </div>
        <div className={styles.info_item}>
          <div className={styles.info_label}>发行日期：</div>
          <div className={cn(styles.info_text)}>
            {currentMediaInfo.premiered._text}
          </div>
        </div>
        <div className={styles.info_item}>
          <div className={styles.info_label}>类型：</div>
          <div className={cn(styles.info_text, styles.genre)}>
            {currentMediaInfo.genre &&
              currentMediaInfo.genre.map(g => (
                <Tag key={g._text}>{g._text}</Tag>
              ))}
          </div>
        </div>
        <div className={styles.info_item}>
          <div className={styles.info_label}>演员：</div>
          <div className={cn(styles.info_text, styles.actor)}>
            {currentMediaInfo.actor &&
              currentMediaInfo.actor.map(a => (
                <figure key={a.name._text}>
                  <img src={a.thumb._text} alt="" />
                  <figcaption>{a.name._text}</figcaption>
                </figure>
              ))}
          </div>
        </div>
      </Col>
    </div>
  </Row>
);
