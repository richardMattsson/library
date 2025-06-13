import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { UserContext } from '../contexts/UserContext';
import BookCard from '../components/bookCard';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const { currentUser, users } = useContext(UserContext);

  let user;
  if (currentUser) {
    user = users.find((user) => user.user === currentUser);
  }

  return (
    <>
      {user ? (
        <>
          <h1>{currentUser}'s favoritböcker</h1>

          {user.favoriteBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </>
      ) : (
        <>
          <h1>Favoriter</h1>

          {favorites.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </>
      )}
    </>
  );
}
