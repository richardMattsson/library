import UserContextProvider from './contexts/UserProvider';
import FavoritesContextProvider from './contexts/FavoritesProvider';
import Router from './router/Router';

import './css/App.css';

function App() {
  return (
    <UserContextProvider>
      <FavoritesContextProvider>
        <Router />
      </FavoritesContextProvider>
    </UserContextProvider>
  );
}

export default App;
