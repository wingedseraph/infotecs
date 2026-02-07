import { ApiUser } from '@/entities/ApiUser';
import { Container } from '@/shared/ui/Container';
import dayjs from 'dayjs';
import styled from 'styled-components';

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

type UsersListProps = {
  users: ApiUser[];
  onUserClick: (user: ApiUser) => void;
};

const UsersList = ({ users, onUserClick }: UsersListProps) => {
  return (
    <List>
      {users.map(user => (
        <ListItem key={user.id}>
          <UserItemButton onClick={() => onUserClick(user)}>
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
  );
};

export default UsersList;
