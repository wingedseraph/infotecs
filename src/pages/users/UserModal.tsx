import { Button, Form, FormInstance, Input, Modal } from 'antd';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

type UserModalProps = {
  mode: 'create' | 'edit' | null;
  form: FormInstance;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDelete: () => void;
};

const UserModal = ({
  mode,
  form,
  isCreating,
  isUpdating,
  isDeleting,
  onClose,
  onSubmit,
  onDelete,
}: UserModalProps) => {
  return (
    <Modal
      title={
        mode === 'create'
          ? 'Создать пользователя'
          : 'Редактировать пользователя'
      }
      open={mode !== null}
      onCancel={onClose}
      getContainer={false}
      destroyOnHidden={true}
      footer={
        <FooterContainer>
          <LeftSide>
            {mode === 'edit' && (
              <Button type="primary" onClick={onDelete} loading={isDeleting}>
                Удалить
              </Button>
            )}
          </LeftSide>
          <RightSide>
            <Button
              type="primary"
              onClick={onClose}
              disabled={isUpdating || isDeleting}
            >
              Отмена
            </Button>
            <Button
              type="primary"
              loading={isCreating || isUpdating}
              onClick={onSubmit}
            >
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </Button>
          </RightSide>
        </FooterContainer>
      }
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        {mode === 'edit' && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true, message: 'Пожалуйста, введите ссылку!' },
            {
              type: 'url',
              message: 'Пожалуйста, введите корректную ссылку!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
