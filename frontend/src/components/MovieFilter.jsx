import React, { useState } from 'react';

function Filter({ genres, onFilterChange }) {
    const [rating, setRating] = useState('');
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('');

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
        onFilterChange({ genre: e.target.value });
    };

    const handleRatingChange = (e) => {
        const newRating = e.target.value;
        setRating(newRating);
        onFilterChange({ rating: newRating });
    };

    const handleSortMostRecent = () => {
        setSort('most_recent');
        onFilterChange({ sort: 'most_recent' });
    };

    const handleSortLeastRecent = () => {
        setSort('least_recent');
        onFilterChange({ sort: 'least_recent' });
    };

    return (
        <div className="p-4 rounded-lg shadow-md mb-4 border-black">
            <div className="flex flex-wrap items-center justify-start lg:justify-between">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                    <select
                        id="genre"
                        className="mt-1 block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleGenreChange}
                        value={genre}
                    >
                        <option value="">All genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort by</label>
                    <div className="mt-1 flex space-x-2">
                        <button onClick={handleSortMostRecent} className="px-4 py-2 bg-transparent border border-black text-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
                            Most Recent
                        </button>
                        <button onClick={handleSortLeastRecent} className="px-4 py-2 bg-transparent border border-black text-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
                            Least Recent
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-1/3">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                        id="rating"
                        className="mt-1 block w-full px-3 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleRatingChange}
                        value={rating}
                    >
                        <option value="">Select rating...</option>
                        {[...Array(11).keys()].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filter;
