import { ApiUser } from '@/entities/ApiUser';
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

export const isDataItem = (data: unknown): data is ApiUser =>
  validateObject(data, dataItemSchema);

export const isDataItemArray = (data: unknown): data is ApiUser[] => {
  return isArray(data, isDataItem);
};

export async function getUsers() {
  try {
    const response = await axios.get(BASE_URL);

    if (!isDataItemArray(response.data)) {
      throw new Error('Некорректные данные с API');
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Что-то пошло не так');
  }
}
