import { useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IndividualChatRoom from './pages/IndividualChatRoom';
import RandomChatRoom from './pages/RandomChatRoom';

export const Routing = () => {
  const routing = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/random',
      element: <RandomChatRoom />,
    },
    {
      path: '/individual',
      element: <IndividualChatRoom />,
    },
  ]);
  return routing;
};

export default Routing;
