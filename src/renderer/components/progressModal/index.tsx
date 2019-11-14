import React from 'react';
import { Progress, Tooltip, Modal } from 'antd';
import { TooltipProps } from 'antd/lib/Tooltip';
import { ProgressProps } from 'antd/lib/progress';
import { ModalProps, ModalFuncProps } from 'antd/lib/modal';

import styles from './index.less';

interface IProps<T> {
  tips?: TooltipProps;
  progress?: ProgressProps & { total: number };
  modal?: T;
}
const getProps = (
  props: IProps<ModalFuncProps | ModalProps>
): IProps<ModalFuncProps | ModalProps> => {
  let { tips, modal, progress } = props;
  progress = {
    // strokeColor: '#f5222d',
    format: percent =>
      `${Math.round((progress.successPercent / 100) * progress.total)} / ${
        progress.total
      }`,
    status: 'active',
    ...progress
  };
  tips = {
    title: `${Math.round(
      (progress.successPercent / 100) * progress.total
    )}已完成 / ${Math.round(
      ((progress.percent - progress.successPercent) / 100) * progress.total
    )}运行中 / ${Math.round(
      ((100 - progress.percent) / 100) * progress.total
    )}等待中`,
    ...tips
  };
  modal = {
    icon: null,
    width: '500px',
    ...modal
  };
  return {
    progress,
    tips,
    modal
  };
};
const getContent = ({ tips, progress }: IProps<ModalFuncProps>) => (
  <div className={styles.progress_modal}>
    <Tooltip {...tips}>
      <Progress status="active" {...progress} />
    </Tooltip>
  </div>
);
const ProgressModal = (props: IProps<ModalProps>) => {
  const { tips, modal, progress } = getProps(props);
  return (
    <Modal footer={null} {...modal} className={styles.progress_modal}>
      <Tooltip {...tips}>
        <Progress status="active" {...progress} />
      </Tooltip>
    </Modal>
  );
};
// 只允许同时出现一个进度框
let modalIns = null;
ProgressModal.show = (props: IProps<ModalFuncProps>) => {
  if (modalIns) return;
  const { tips, modal, progress } = getProps(props);
  modalIns = Modal.info({
    okButtonProps: { style: { display: 'none' } },
    content: getContent({ tips, progress }),
    ...modal
  });
};
ProgressModal.update = (props: IProps<ModalFuncProps>) => {
  if (!modalIns) return;
  const iprops = getProps(props);
  const content = getContent(iprops);
  modalIns.update({ content, ...iprops.modal });
};
ProgressModal.destroy = () => {
  modalIns.destroy();
  modalIns = null;
};
export default ProgressModal;
