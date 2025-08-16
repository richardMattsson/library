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

  // Jag skulle behöva skapa en många till många tabeller med users, favoritebooks och user_favoritebooks
  // Istället för spara böcker till users arrayen, spara id på boken i favoritebooks och koppla med foreign key med user
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
  // Här anropa endpoint instället som uppdaterar förhållandet mellan users och users_favoritebooks
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
    // Här leta igenom databasen istället om boken är favorit eller inte
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
