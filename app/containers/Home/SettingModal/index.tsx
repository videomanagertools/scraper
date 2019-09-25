import React, { useRef } from 'react';
import { Modal } from 'antd';
import SettingForm from './form';

const SettingModal = ({ visible, onCancle }) => {
  const settingForm = useRef<any | undefined>();
  return (
    <Modal
      width="60%"
      onOk={() => {
        settingForm.current.submitForm();
      }}
      okText="保存"
      cancelText="取消"
      onCancel={onCancle}
      visible={visible}
      maskClosable={false}
      keyboard={false}
      title="设置"
      destroyOnClose
    >
      <SettingForm wrappedComponentRef={settingForm} />
    </Modal>
  );
};
export default SettingModal;
