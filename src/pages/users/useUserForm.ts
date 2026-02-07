import { ApiUser } from '@/entities/ApiUser';
import { USER_RESPONSE_MESSAGE } from '@/shared/api/constants';
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from '@/shared/api/users-hooks';
import { getErrorMessage } from '@/shared/lib/error-utils';
import { FormInstance, message } from 'antd';

export const useUserForm = () => {
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const handleCreate = async (form: FormInstance) => {
    const values = await form.validateFields();

    createUserMutation.mutate(values, {
      onSuccess: () => {
        message.success(USER_RESPONSE_MESSAGE.SUCCESSFUL_CREATED);
      },
      onError: (error: unknown) => {
        const errorMessage = getErrorMessage(error);
        message.error(
          `${USER_RESPONSE_MESSAGE.FAILED_CREATED} ${errorMessage}`
        );
      },
    });
  };

  const handleUpdate = async (form: FormInstance, user: ApiUser) => {
    const values = await form.validateFields();

    const updatedUser = {
      ...user,
      name: values.name,
      avatar: values.avatar,
    };

    updateUserMutation.mutate(updatedUser, {
      onSuccess: () => {
        message.success(USER_RESPONSE_MESSAGE.SUCCESSFUL_UPDATED);
      },
      onError: (error: unknown) => {
        const errorMessage = getErrorMessage(error);
        message.error(
          `${USER_RESPONSE_MESSAGE.FAILED_UPDATED} ${errorMessage}`
        );
      },
    });
  };

  const handleDelete = (user: ApiUser) => {
    deleteUserMutation.mutate(user.id, {
      onSuccess: () => {
        message.success(USER_RESPONSE_MESSAGE.SUCCESSFUL_DELETED);
      },
      onError: (error: unknown) => {
        const errorMessage = getErrorMessage(error);
        message.error(
          `${USER_RESPONSE_MESSAGE.FAILED_DELETED} ${errorMessage}`
        );
      },
    });
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};
