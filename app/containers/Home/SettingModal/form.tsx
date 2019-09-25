import React, { useImperativeHandle, forwardRef } from 'react';
import { Select, Form } from 'antd';
// import { FormComponentProps } from 'antd/lib/form';
import config from '@config';
import styles from './index.less';

const { Option } = Select;
const { Item } = Form;

// interface IProps extends FormComponentProps {
//   visible: boolean;
//   onCancle: () => void;
// }
const SettingForm = ({ form }, ref) => {
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      form.validateFields((err, values) => {
        if (err) return;
        config.set(values);
        console.log(config.path);
      });
    }
  }));
  const tags = config.get('tags', []);
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
    </Form>
  );
};

export default Form.create()(forwardRef(SettingForm));
