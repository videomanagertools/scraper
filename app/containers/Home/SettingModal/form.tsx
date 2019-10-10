import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Select, Form, Cascader, Row, Col } from 'antd';
import config from '@config';
import styles from './index.less';
import { mediaType } from '@scraper';

const { Option } = Select;
const { Item } = Form;

const SettingForm = ({ form }, ref) => {
  const tags = config.get('tags');
  const scene = config.get('scene', ['movie', 'normal']);
  // const sceneSourceMapping = config.get('sceneSourceMapping', {});
  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise((resolve, reject) => {
        form.validateFields((err, values) => {
          if (err) return reject(err);
          config.set(values);
          console.log(config.path);
          resolve();
        });
      })
  }));
  // const [mediaSourceVisible, setMediaSourceVisible] = useState(false);
  console.log(useState);
  const { getFieldDecorator } = form;
  return (
    <Form
      layout="inline"
      wrapperCol={{ span: 18, offset: 1 }}
      labelCol={{ span: 2, offset: 1 }}
      className={styles.setting_form}
    >
      <Item label="预设标签">
        {getFieldDecorator('tags', { initialValue: tags })(
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
            {tags.map(tag => (
              <Option key={tag}>{tag}</Option>
            ))}
          </Select>
        )}
      </Item>
      <Item label="场景">
        <Row>
          <Col span={10}>
            {getFieldDecorator('scene', { initialValue: scene })(
              <Cascader options={mediaType} allowClear={false} />
            )}
          </Col>
        </Row>
      </Item>
    </Form>
  );
};

export default Form.create()(forwardRef(SettingForm));
