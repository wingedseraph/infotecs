import { Button } from 'antd';
import dayjs from 'dayjs';

const now = dayjs();
const formattedDate = now.format('HH:mm:ss');

const Home = () => {
  return (
    <div>
      <p>datetime: {formattedDate}</p>

      <Button type="primary">Button</Button>
    </div>
  );
};

export default Home;
