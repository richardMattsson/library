import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import Navbar from '../components/Navbar';
import Details from '../pages/Details';

function Router() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Favorites />, path: '/favorites' },
        { element: <Profile />, path: '/profile' },
        { element: <Details />, path: '/details/:bookId' },
      ],
      element: (
        <>
          <Navbar />

          <main className="App-main">
            <Outlet />
          </main>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
