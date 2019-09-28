import React from 'react';
import { Row, Col, Tag, Select } from 'antd';
import cn from 'classnames';
import { get } from 'lodash';
import styles from './index.less';

const { Option } = Select;

interface Props {
  currentMediaInfo: any;
  selectable?: boolean;
  onSelect?: (keys: string[]) => void;
  tags?: string[];
}
export default ({
  currentMediaInfo,
  selectable = false,
  onSelect = () => {},
  tags = []
}: Props) => {
  const selectedTags = get(currentMediaInfo, 'tag', []).map(tag => tag._text);
  return (
    <Row>
      <div className={styles.media_info}>
        <div className={styles.media_title}>
          {get(currentMediaInfo, 'title._text')}
        </div>
        <Col span={8} offset={2}>
          <img
            style={{ maxWidth: '100%' }}
            src={get(currentMediaInfo, 'art.poster._text')}
            alt=""
          />
        </Col>
        <Col span={12} offset={2}>
          <div className={styles.info_item}>
            <div className={styles.info_label}>ID：</div>
            <div className={cn(styles.info_text, styles.uniqueid)}>
              {get(currentMediaInfo, 'uniqueid._text')}
            </div>
          </div>
          <div className={styles.info_item}>
            <div className={styles.info_label}>发行日期：</div>
            <div className={cn(styles.info_text)}>
              {get(currentMediaInfo, 'premiered._text')}
            </div>
          </div>
          <div className={styles.info_item}>
            <div className={styles.info_label}>类型：</div>
            <div className={cn(styles.info_text, styles.genre)}>
              {get(currentMediaInfo, 'genre', []).map(g => (
                <Tag key={g._text}>{g._text}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.info_item}>
            <div className={styles.info_label}>标签</div>
            <div className={cn(styles.info_text, styles.genre)}>
              {selectable ? (
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="选择标签"
                  onChange={onSelect}
                  defaultValue={selectedTags}
                  value={selectedTags}
                >
                  {tags.map(t => (
                    <Option key={t}>{t}</Option>
                  ))}
                </Select>
              ) : (
                selectedTags.map(g => <Tag key={g._text}>{g._text}</Tag>)
              )}
            </div>
          </div>
          <div className={styles.info_item}>
            <div className={styles.info_label}>演员：</div>
            <div className={cn(styles.info_text, styles.actor)}>
              {get(currentMediaInfo, 'actor', []).map(a => (
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
};
