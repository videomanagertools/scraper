import React, { ReactNode } from "react";
import { Icon, Popover } from "antd";
interface IProps {
  content?: string | ReactNode;
  title?: string;
  [key: string]: any;
}
const ToolTipIcon = (props: IProps) => {
  const { content, title } = props;
  return (
    <Popover content={content} title={title}>
      <Icon type="exclamation-circle" theme="twoTone" {...props} />
    </Popover>
  );
};
export default ToolTipIcon;
