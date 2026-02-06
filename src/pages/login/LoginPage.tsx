import { FieldType } from '@/pages/login/entities';
import { useAuth } from '@/shared/hooks/useAuth';
import { Button, Form, type FormProps, Input } from 'antd';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = user => {
    const { username, password } = user;
    if (!username || !password) return;

    login({ username, password });
  };

  return (
    <FormContainer>
      <Form name="basic" onFinish={onFinish}>
        <Form.Item label={null}>
          <HeaderContainer>
            <p> Авторизация</p>
          </HeaderContainer>
        </Form.Item>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
        >
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш пароль!' },
          ]}
        >
          <Input.Password autoComplete="currentPassword" placeholder="Пароль" />
        </Form.Item>

        <ButtonContainer>
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Войти
            </Button>
          </Form.Item>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
