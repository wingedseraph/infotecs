import { ButtonContainer } from '@/pages/login/LoginPage';
import { getUsers } from '@/shared/api/users-api';
import { useAuth } from '@/shared/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 1rem;
  width: clamp(390px, 70vw, 1200px);
`;
const List = styled.ul`
  list-style: none;
  padding: 10px 20px;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-bottom: none;
  }

  img {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    margin-right: 15px;
  }

  h4,
  p {
    margin: 0;
  }

  h4 {
    margin-top: 10px;
    font-size: 18px;
  }

  p {
    margin-top: 5px;
    color: #aaa;
  }
`;
const UserItemButton = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const UsersPage = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getUsers,
    queryKey: ['users'],
  });
  const auth = useAuth();
  const handleLogout = () => auth.logout();

  if (isLoading)
    return (
      <Container>
        <Spin />;
      </Container>
    );
  if (isError)
    return (
      <Container>
        <h1>Ошибка загрузки: {error}</h1>
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
        <List>
          {users?.map(user => (
            <ListItem key={user.id}>
              <UserItemButton>
                <img src={user.avatar} alt={user.name} />
                <Container>
                  <h4>{user.name}</h4>
                  <p>
                    Зарегистрирован {dayjs(user.createdAt).format('DD.MM.YYYY')}
                  </p>
                </Container>
              </UserItemButton>
            </ListItem>
          ))}
        </List>
      </Container>

      <div>
        <Button type="primary">Создать пользователя</Button>
      </div>
    </Container>
  );
};

export default UsersPage;
