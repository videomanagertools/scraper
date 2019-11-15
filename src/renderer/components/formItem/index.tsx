import React from "react";
import { Form, Icon, Popover } from "antd";

const { Item } = Form;
interface IProps {
  label?: string;
  tips?: string;
  title?: string;
  [key: string]: any;
}
const FormItem = (props: IProps) => {
  const { label, tips, title = "提示" } = props;
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
