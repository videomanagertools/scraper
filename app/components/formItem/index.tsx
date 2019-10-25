import React from 'react';
import { Form, Icon, Popover } from 'antd';

const { Item } = Form;
const FormItem = props => {
  const { label, tips, title = '提示' } = props;
  return (
    <div>
      <Item
        {...props}
        label={
          <span>
            {label}
            <Popover content={tips} title={title}>
              <Icon
                style={{ marginLeft: 5 }}
                type="exclamation-circle"
                theme="twoTone"
              />
            </Popover>
          </span>
        }
      />
    </div>
  );
};

export default FormItem;
