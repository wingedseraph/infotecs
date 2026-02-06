export type User = {
  uuid: string;
  username: string;
  password: string;
};

export type UserWithoutId = Omit<User, 'uuid'>;
