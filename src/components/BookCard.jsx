import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

import '../css/BookCard.css';

function BookCard({ book }) {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const favorite = isFavorite(book.id);

  return (
    <section aria-labelledby="book-heading" className="BookCard-container">
      <h2 id="book-heading" className="bookcard-header">
        {book.volumeInfo.title}
      </h2>
      <figure className="BookCard-aside">
        {' '}
        {book.volumeInfo.imageLinks ? (
          <img
            src={book.volumeInfo.imageLinks.smallThumbnail}
            alt={`bild på ${book.volumeInfo.title}`}
            className="BookCard-img"
          />
        ) : (
          <div className="BookCard-divNoImage">Ingen bild tillgänglig</div>
        )}
      </figure>

      <section aria-labelledby="book-heading" className="BookCard-main">
        <dl>
          <dt>Författare:</dt>
          {book.volumeInfo.authors?.map((author) => (
            <dd key={author}>{author}</dd>
          ))}
          <dt>Publicerad:</dt>
          <dd>{book.volumeInfo.publishedDate}</dd>
          <dt>Kategori:</dt>
          <dd>
            {book.volumeInfo.categories
              ? book.volumeInfo.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))
              : '-'}
          </dd>
        </dl>

        <h4 style={{ marginBottom: 0, fontWeight: 'inherit' }}>Beskrivning:</h4>
        {book.volumeInfo.description ? (
          <p>{book.volumeInfo.description.slice(0, 150)}...</p>
        ) : (
          <p>Ingen beskrivning tillgänglig.</p>
        )}
        <div>
          <button
            onClick={
              favorite
                ? () => removeFromFavorites(book.id)
                : () => addToFavorites(book)
            }
          >
            {favorite ? '❤️' : '🤍'}
          </button>
          <button onClick={() => navigate(`/details/${book.id}`)}>
            Läs mer
          </button>
        </div>
      </section>
    </section>
  );
}

export default BookCard;
