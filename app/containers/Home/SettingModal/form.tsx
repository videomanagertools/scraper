import React, { useImperativeHandle, forwardRef } from 'react';
import { Select, Form, Cascader, Row, Col, Switch, Input } from 'antd';
import config from '@config';
import styles from './index.less';
import { mediaType } from '@scraper';

const { Option } = Select;
const { Item } = Form;

const SettingForm = ({ form }, ref) => {
  const tagsConfig = config.get('tags');
  const sceneConfig = config.get('scene', ['movie', 'normal']);
  const proxyConfig = config.get('proxy');
  // const sceneSourceMapping = config.get('sceneSourceMapping', {});
  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise((resolve, reject) => {
        form.validateFields((err, values) => {
          if (err) return reject(err);
          const { tags, scene, proxyUrl, proxyEnable } = values;
          config.set({
            tags,
            scene,
            proxy: {
              enable: proxyEnable,
              url: proxyUrl
            }
          });
          resolve();
        });
      })
  }));

  const { getFieldDecorator } = form;
  return (
    <Form
      layout="inline"
      wrapperCol={{ span: 18, offset: 1 }}
      labelCol={{ span: 2, offset: 1 }}
      className={styles.setting_form}
    >
      <Item label="预设标签">
        {getFieldDecorator('tags', { initialValue: tagsConfig })(
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
            {tagsConfig.map(tag => (
              <Option key={tag}>{tag}</Option>
            ))}
          </Select>
        )}
      </Item>
      <Item label="场景">
        <Row>
          <Col span={10}>
            {getFieldDecorator('scene', { initialValue: sceneConfig })(
              <Cascader options={mediaType} allowClear={false} />
            )}
          </Col>
        </Row>
      </Item>
      <Item label="代理">
        <Row>
          <Col span={10}>
            {getFieldDecorator('proxyEnable', {
              initialValue: proxyConfig.enable,
              valuePropName: 'checked'
            })(<Switch />)}
            {getFieldDecorator('proxyUrl', {
              initialValue: proxyConfig.url
            })(<Input />)}
          </Col>
        </Row>
      </Item>
    </Form>
  );
};

export default Form.create()(forwardRef(SettingForm));
