import { ApiUser } from '@/entities/ApiUser';
import { GENERIC_RESPONSE_MESSAGE } from '@/shared/api/constants';
import { getErrorMessage } from '@/shared/lib/error-utils';
import { isArray, Schema, validateObject } from '@/shared/lib/guards';
import { isString } from 'antd/es/button';
import axios from 'axios';

const BASE_URL =
  String(process.env.API_URL) ||
  ('https://698356809c3efeb892a5695b.mockapi.io/users' as const);

const dataItemSchema: Schema<ApiUser> = {
  avatar: isString,
  createdAt: isString,
  id: isString,
  name: isString,
};

const isDataItem = (data: unknown): data is ApiUser =>
  validateObject(data, dataItemSchema);

const isDataItemArray = (data: unknown): data is ApiUser[] => {
  return isArray(data, isDataItem);
};

export async function getUsers() {
  try {
    const response = await axios.get(BASE_URL);

    if (!isDataItemArray(response.data)) {
      throw new Error(GENERIC_RESPONSE_MESSAGE.WRONG_API_DATA);
    }

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}

export async function createUser(userData: Omit<ApiUser, 'id' | 'createdAt'>) {
  try {
    const response = await axios.post(BASE_URL, userData);

    if (!isDataItem(response.data)) {
      throw new Error(GENERIC_RESPONSE_MESSAGE.WRONG_API_DATA);
    }

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}

export async function updateUser(userData: Omit<ApiUser, 'createdAt'>) {
  try {
    const response = await axios.put(`${BASE_URL}/${userData.id}`, userData);

    if (!isDataItem(response.data)) {
      throw new Error(GENERIC_RESPONSE_MESSAGE.WRONG_API_DATA);
    }

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}

export async function deleteUser(id: string) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
}
