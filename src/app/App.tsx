import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
