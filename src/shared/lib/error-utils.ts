import { GENERIC_RESPONSE_MESSAGE } from '@/shared/api/constants';

export function getErrorMessage(error: unknown, msg?: string) {
  if (error instanceof Error) {
    return error.message;
  }
  return msg || GENERIC_RESPONSE_MESSAGE.SOMETHING_WENT_WRONG;
}
