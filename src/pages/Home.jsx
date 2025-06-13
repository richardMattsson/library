import { useState, useEffect } from 'react';
import BookCard from '../components/bookCard';
import '../css/Home.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState([]);

  const prevSearchQuery = JSON.parse(sessionStorage.getItem('searchQuery'));
  const [initialSearchQuery, setInitialSearchQuery] = useState(
    prevSearchQuery || 'bestseller'
  );

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${initialSearchQuery}`)
      .then((response) => response.json())
      .then((result) => {
        setBooks(result.items);
      });
  }, [initialSearchQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    sessionStorage.setItem('searchQuery', JSON.stringify(inputValue));
    setInitialSearchQuery(inputValue);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`)
      .then((response) => response.json())
      .then((result) => {
        setBooks(result.items);
      });
  }
  return (
    <>
      <section className="Home-header" aria-labelledby="search-heading">
        <h1 id="search-heading" className="Home-h1">
          Bibliotek
        </h1>
        <form onSubmit={handleSubmit} className="Home-form">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="Home-input"
          />

          <button type="submit">Sök</button>
        </form>
      </section>

      <article className="Home-article">
        {books && books.map((book) => <BookCard book={book} key={book.id} />)}
      </article>
    </>
  );
}
