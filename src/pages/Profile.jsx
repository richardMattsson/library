import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LogIn from '../components/LogIn';
import CreateNewAccount from '../components/createNewAccount';

import '../css/Profile.css';

export default function Profile() {
  const { login, users, currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  let user;
  if (currentUser) {
    user = users.find((user) => user.user === currentUser);
  }

  return (
    <>
      {user ? (
        <>
          <h1>Hej {currentUser}!</h1>
          <h2>Nu kan du spara böcker som favoriter och ge ditt betyg.</h2>
          <table>
            <thead>
              <tr>
                <th>Favoritböcker</th>
                <th>Betyg</th>
                <th>Kategori</th>
                <th>Författare</th>
              </tr>
            </thead>
            <tbody>
              {user.favoriteBooks.map((book) => (
                <tr key={book.id}>
                  <td
                    onClick={() => navigate(`/details/${book.id}`)}
                    className="hover-underline"
                  >
                    {book.volumeInfo.title}
                  </td>
                  <td>{book.rating ? book.rating : '-'}</td>
                  <td>
                    {book.volumeInfo.categories
                      ? book.volumeInfo.categories.map((category) => (
                          <span key={category}>{category}</span>
                        ))
                      : '-'}
                  </td>
                  <td>
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.map((author) => (
                        <span key={author}>{author}</span>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setCurrentUser(null)}>Logga ut</button>
        </>
      ) : (
        <>
          <article className="Profile-container">
            {login ? <LogIn /> : <CreateNewAccount />}
          </article>
        </>
      )}
    </>
  );
}
