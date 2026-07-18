import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ScenarioSelectPage } from './pages/ScenarioSelectPage';
import { ChatPage } from './pages/ChatPage';
import { DebriefPage } from './pages/DebriefPage';
import { HistoryPage } from './pages/HistoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/select',
    element: <ScenarioSelectPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  },
  {
    path: '/debrief',
    element: <DebriefPage />
  },
  {
    path: '/history',
    element: <HistoryPage />
  }
]);
export default router;
