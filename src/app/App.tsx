import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import styles from './App.module.css';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: tomato;
`;

const App = () => {
  return (
    <div className={styles.app}>
      <header>
        <Title>styled header</Title>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
