import React, { useImperativeHandle, forwardRef } from "react";
import {
  Select,
  Form,
  Cascader,
  Row,
  Col,
  Switch,
  Input,
  InputNumber,
  Divider
} from "antd";
import FormItem from "@components/FormItem";
import config from "@config";
import styles from "./index.less";
import { mediaType } from "@scraper";

const { Option } = Select;
const { Item } = Form;
interface IProps {
  form: any;
}
const SettingForm = ({ form }: IProps, ref: any) => {
  const tagsConfig = config.get("tags");
  const sceneConfig = config.get("scene", ["movie", "normal"]);
  const proxyConfig = config.get("proxy");
  const thumbnails = config.get("thumbnails");
  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise((resolve, reject) => {
        form.validateFields((err, values) => {
          if (err) return reject(err);
          const {
            tags,
            scene,
            proxyUrl,
            proxyEnable,
            thumbnailsEnable,
            thumbnailsCount,
            thumbnailsSize,
            thumbnailsParallel
          } = values;
          config.set({
            tags,
            scene,
            proxy: {
              enable: proxyEnable,
              url: proxyUrl
            },
            thumbnails: {
              enable: thumbnailsEnable,
              count: thumbnailsCount,
              size: thumbnailsSize,
              parallel: thumbnailsParallel
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
      <FormItem label="预设标签" tips="添加标签池，可以在元信息编辑中快速选择">
        {getFieldDecorator("tags", { initialValue: tagsConfig })(
          <Select mode="tags" style={{ width: "100%" }} placeholder="Tags">
            {tagsConfig.map(tag => (
              <Option key={tag}>{tag}</Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem label="场景" tips="切换场景和信息源">
        <Row>
          <Col span={10}>
            {getFieldDecorator("scene", { initialValue: sceneConfig })(
              <Cascader options={mediaType} allowClear={false} />
            )}
          </Col>
        </Row>
      </FormItem>
      <Divider dashed orientation="left" />
      <Item label="代理">
        <Row>
          <Col span={10}>
            {getFieldDecorator("proxyEnable", {
              initialValue: proxyConfig.enable,
              valuePropName: "checked"
            })(<Switch />)}
          </Col>
        </Row>
      </Item>
      <Item wrapperCol={{ offset: 4 }}>
        {getFieldDecorator("proxyUrl", {
          initialValue: proxyConfig.url
        })(<Input />)}
      </Item>
      <Divider dashed orientation="left" />
      <FormItem
        label="帧截图"
        tips="开启后，顶部会提供帧截图按钮。使用前确保环境变量ffmpeg是可用的"
      >
        <Row>
          <Col span={10}>
            {getFieldDecorator("thumbnailsEnable", {
              initialValue: thumbnails.enable,
              valuePropName: "checked"
            })(<Switch />)}
          </Col>
        </Row>
      </FormItem>
      <FormItem
        label="截图个数"
        tips="每部电影生成截图的个数，过大可能造成性能问题"
      >
        {getFieldDecorator("thumbnailsCount", {
          initialValue: thumbnails.count
        })(<InputNumber />)}
      </FormItem>
      <FormItem
        label="截图尺寸"
        tips="固定宽高格式:400x300;定宽格式:400x?;定高格式: ?x300"
        wrapperCol={{ span: 2, offset: 1 }}
      >
        {getFieldDecorator("thumbnailsSize", {
          initialValue: thumbnails.size
        })(<Input />)}
      </FormItem>
      <FormItem
        label="并行"
        tips="同时进行截图的最多文件个数"
        wrapperCol={{ span: 2, offset: 1 }}
      >
        {getFieldDecorator("thumbnailsParallel", {
          initialValue: thumbnails.parallel
        })(<InputNumber />)}
      </FormItem>
      <Divider dashed orientation="left" />
    </Form>
  );
};

export default Form.create()(forwardRef(SettingForm));
