import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { FavoritesContext } from './FavoritesContext';

function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const { currentUser, users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const prevFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (prevFavorites) setFavorites(prevFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    if (currentUser) {
      const updatedUsers = users.map((user) =>
        user.user === currentUser
          ? { ...user, favoriteBooks: [...user.favoriteBooks, book] }
          : user
      );
      setUsers(updatedUsers);
    } else {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookId) => {
    if (currentUser) {
      const updatedUsers = users.map((user) =>
        user.user === currentUser
          ? {
              ...user,
              favoriteBooks: user.favoriteBooks.filter(
                (book) => book.id !== bookId
              ),
            }
          : user
      );
      setUsers(updatedUsers);
    } else {
      setFavorites((books) => books.filter((book) => book.id !== bookId));
    }
  };

  const isFavorite = (bookId) => {
    if (currentUser) {
      const user = users.find((user) => user.user === currentUser);

      return user.favoriteBooks.some((book) => book.id === bookId);
    } else {
      return favorites.some((book) => book.id === bookId);
    }
  };

  const value = {
    favorites,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
