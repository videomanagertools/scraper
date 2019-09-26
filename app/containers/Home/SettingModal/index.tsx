import React, { useRef } from 'react';
import { Modal, Button } from 'antd';
import SettingForm from './form';
import config from '@config';

const SettingModal = ({ visible, onCancle }) => {
  const settingForm = useRef<any | undefined>();
  return (
    <Modal
      width="60%"
      okText="保存"
      cancelText="取消"
      onCancel={onCancle}
      visible={visible}
      maskClosable={false}
      keyboard={false}
      title="设置"
      destroyOnClose
      footer={
        <>
          <Button onClick={() => config.openInEditor()}>编辑JSON</Button>
          <Button onClick={onCancle}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              settingForm.current.submitForm();
            }}
          >
            保存
          </Button>
        </>
      }
    >
      <SettingForm wrappedComponentRef={settingForm} />
    </Modal>
  );
};
export default SettingModal;
