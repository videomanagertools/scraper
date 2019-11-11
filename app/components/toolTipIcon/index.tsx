import React from 'react';
import { Icon, Popover } from 'antd';

const ToolTipIcon = props => {
  const { content, title } = props;
  return (
    <Popover content={content} title={title}>
      <Icon type="exclamation-circle" theme="twoTone" {...props} />
    </Popover>
  );
};
export default ToolTipIcon;
