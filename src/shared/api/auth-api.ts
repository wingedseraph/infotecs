import { UserWithoutId } from '@/entities/user';
import { AUTH_MESSAGE } from '@/shared/api/constants';

const defaultCredential = process.env.DEFAULT_CREDENTIAL || ('admin' as const);

export const login = async (user: UserWithoutId) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (
    user.username !== defaultCredential ||
    user.password !== defaultCredential
  ) {
    throw new Error(AUTH_MESSAGE.INVALID_CREDENTIAL);
  }

  const token = crypto.randomUUID();
  return { token };
};
