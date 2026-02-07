import { ApiUser } from '@/entities/ApiUser';
import { ButtonContainer } from '@/pages/login/LoginPage';
import UserModal from '@/pages/users/UserModal';
import UsersList from '@/pages/users/UsersList';
import { useGetUsers } from '@/shared/api/users-hooks';
import { useAuth } from '@/shared/hooks/useAuth';
import { getErrorMessage } from '@/shared/lib/error-utils';
import { Container } from '@/shared/ui/Container';
import { Button, Form, Spin } from 'antd';
import { useState } from 'react';
import { useUserForm } from './useUserForm';

const UsersPage = () => {
  const [mode, setMode] = useState<'create' | 'edit' | null>(null);
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);
  const [form] = Form.useForm();

  const {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
  } = useUserForm();

  const openCreate = () => {
    setMode('create');
    setCurrentUser(null);
    form.resetFields();
  };

  const openEdit = (user: ApiUser) => {
    setMode('edit');
    setCurrentUser(user);
    form.setFieldsValue({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    });
  };

  const closeModal = () => {
    setMode(null);
    setCurrentUser(null);
    form.resetFields();
  };

  const handleOk = async () => {
    if (mode === 'create') {
      await handleCreate(form);
    } else if (mode === 'edit' && currentUser) {
      await handleUpdate(form, currentUser);
    }
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      handleDelete(currentUser);
      closeModal();
    }
  };

  const { data: users, isLoading, isError, error } = useGetUsers();

  const auth = useAuth();
  const handleLogout = () => auth.logout();

  if (isLoading)
    return (
      <Container>
        <Spin />
      </Container>
    );
  if (isError)
    return (
      <Container>
        <h1>
          Ошибка загрузки:
          {getErrorMessage(error)}
        </h1>
      </Container>
    );

  return (
    <Container>
      <ButtonContainer>
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </ButtonContainer>

      <Container>
        <UsersList users={users ?? []} onUserClick={openEdit} />
      </Container>

      <div>
        <Button onClick={openCreate} type="primary">
          Создать пользователя
        </Button>

        <UserModal
          mode={mode}
          form={form}
          isCreating={isCreating}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onClose={closeModal}
          onSubmit={handleOk}
          onDelete={handleDeleteUser}
        />
      </div>
    </Container>
  );
};

export default UsersPage;
