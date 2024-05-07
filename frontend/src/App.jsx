import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import MovieFilter from './components/MovieFilter';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalFilms, setTotalFilms] = useState(0);


  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage('');
    const query = new URLSearchParams(filters).toString();
    try {
        const response = await fetch(`http://localhost:8000/movies?${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data || data.length === 0) {
            setErrorMessage('No movies found for the selected filter');
            setMovies([]);
        } else {
            setMovies(data);
        }
    } catch (error) {
        console.error('Error loading movies:', error);
        setErrorMessage('Error loading movies. Please try again later.');
    } finally {
        setLoading(false);
    }
};


  const fetchGenres = async () => {
    const response = await fetch('http://localhost:8000/genres');
    const data = await response.json();
    console.log("Genres", data);
    setGenres(data);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <MainLayout>
      <PageHeading />

      <MovieFilter onFilterChange={handleFilterChange} genres={genres} />

      {errorMessage ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      ) : (
        <MovieCollection loading={loading}>
          {movies.map((item, index) => (
            <MovieCard key={index} {...item} />
          ))}
        </MovieCollection>
      )}

    </MainLayout>
  );
};

const MainLayout = ({ children }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {children}
      </div>
    </section>
  );
};

const PageHeading = () => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Movie Collection
      </h1>
      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore our vast movie collection
      </p>
    </div>
  );
};

const MovieCollection = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {children}
    </div>
  );
};

const MovieCard = ({ imageUrl, title, year, rating, plot, wikipediaUrl }) => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {year || rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
              <span>{year}</span>
              {rating
                ? <div>
                  <span className="mr-0.5">{rating}</span>
                </div>
                : null
              }
            </div>
            : null
          }

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {plot.substr(0, 80)}...
          </p>
        </div>

        {wikipediaUrl
          ? <Button
            color="light"
            size="xs"
            className="w-full"
            onClick={() => window.open(wikipediaUrl, '_blank')}
          >
            More
          </Button>
          : null
        }
      </div>
    </div>
  );
};

export default App;
