import React from 'react';
import { useUIStore } from '@/stores/uiStore';
import Modal from '@/components/common/Modal';
import TaskForm from './TaskForm';

const NewTaskModal: React.FC = () => {
  const { modal, closeModal, showToast } = useUIStore();

  if (modal.type !== 'newTask') return null;

  const handleSuccess = () => {
    showToast('새 Task가 생성되었습니다.');
    closeModal();
  };

  return (
    <Modal isOpen={!!modal.type} onClose={closeModal} title="새 Task 생성">
      <TaskForm onSuccess={handleSuccess} onCancel={closeModal} />
    </Modal>
  );
};

export default NewTaskModal;
