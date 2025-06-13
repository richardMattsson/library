import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { UserContext } from '../contexts/UserContext';

// Här testade jag att ta bort css-filen och istället styla i komponenten med bl.a. styled components.

const BookDetailsContainer = styled.article`
  border: 1px solid grey;
  background-color: rgb(59, 55, 55);
  padding: 30px;
  border-radius: 10px;
  max-width: 1000px;
  display: flex;
`;

const BookDetailsSection = styled.section`
  padding: ${(props) => props.$padding}px;
`;

const NoImageDiv = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 125px;
  height: 200px;
  border: 1px solid grey;
`;

export default function Details() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  let [isExpanded, setIsExpanded] = useState(true); // används för att öka eller minska beskrivningen av boken.
  const [rating, setRating] = useState(0);

  const { setFavorites, favorites } = useContext(FavoritesContext);
  const { currentUser, users, setUsers } = useContext(UserContext);

  let user;
  if (currentUser) {
    user = users.find((user) => user.user === currentUser);
  }

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => response.json())
      .then((result) => {
        setBook(result);
      });
  }, [bookId]);

  useEffect(() => {
    if (currentUser) {
      let book = user.favoriteBooks.find((book) => book.id === bookId);
      if (book) {
        setRating(book.rating);
      }
    } else if (favorites.length > 0) {
      let book = favorites.find((book) => book.id === bookId);
      if (book) {
        setRating(book.rating);
      }
    }
  }, [users, currentUser, bookId, favorites, book, user]);

  function handleRating(rate) {
    setRating(rate);

    if (currentUser) {
      let updatedFavoriteBooks = user.favoriteBooks.map((book) =>
        book.id === bookId ? { ...book, rating: rate } : book
      );
      const updatedUsers = users.map((user) =>
        user.user === currentUser
          ? { ...user, favoriteBooks: updatedFavoriteBooks }
          : user
      );
      setUsers(updatedUsers);
    } else {
      let updatedFavorites = favorites.map((book) =>
        book.id === bookId ? { ...book, rating: rate } : book
      );

      setFavorites(updatedFavorites);
    }
  }

  return (
    <>
      {book && (
        <BookDetailsContainer>
          <BookDetailsSection $padding={30} aria-labelledby="book-heading">
            <header>
              <h1 id="book-heading">{book.volumeInfo.title}</h1>
              {book.volumeInfo.authors ? (
                book.volumeInfo.authors.map((author) => (
                  <h2 key={author}>{author}</h2>
                ))
              ) : (
                <p>(Inga författare tillgängliga)</p>
              )}
              <span>{book.volumeInfo.publishedDate}</span> •{' '}
              <span>{book.volumeInfo.publisher}</span>
            </header>

            <label>
              <h3 style={{ fontWeight: 'inherit' }}>Beskrivning:</h3>
              {book.volumeInfo.description ? (
                isExpanded ? (
                  <>
                    <p>
                      {book.volumeInfo.description.replace(/<[^>]*>/g, '')}
                      <u
                        onClick={() =>
                          setIsExpanded((isExpanded = !isExpanded))
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        Visa mindre
                      </u>
                    </p>
                  </>
                ) : (
                  <p>
                    {book.volumeInfo.description
                      .replace(/<[^>]*>/g, '')
                      ?.slice(0, 100)}
                    <u
                      onClick={() => setIsExpanded((isExpanded = !isExpanded))}
                      style={{ cursor: 'pointer' }}
                    >
                      Visa mer
                    </u>
                  </p>
                )
              ) : (
                <p> Ingen beskrivning tillgänglig...</p>
              )}

              <h4 style={{ fontWeight: 'inherit' }}>Länk:</h4>
              <a href={book.volumeInfo.infoLink}>
                <u>{book.volumeInfo.infoLink}</u>
              </a>
            </label>
          </BookDetailsSection>

          <BookDetailsSection $padding={20} aria-labelledby="book-heading">
            <Rating
              onClick={handleRating}
              initialValue={rating}
              style={{ marginTop: '20px' }}
            />
            {book.volumeInfo.imageLinks ? (
              <img
                style={{ marginTop: '20px' }}
                src={
                  book.volumeInfo.imageLinks.small
                    ? book.volumeInfo.imageLinks.small.replace(
                        /^http:\/\//,
                        'https://'
                      )
                    : book.volumeInfo.imageLinks.thumbnail
                }
                alt={book.volumeInfo.title}
              />
            ) : (
              <NoImageDiv>Ingen bild tillgänglig</NoImageDiv>
            )}
          </BookDetailsSection>
        </BookDetailsContainer>
      )}
    </>
  );
}
