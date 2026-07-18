import { RouterProvider } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import { router } from './router';

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
