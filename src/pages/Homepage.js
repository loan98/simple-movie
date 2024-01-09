import React from 'react';
import MovieList from '../components/movie/MovieList';

const Homepage = () => {
    return (
        <>
            <section className="pb-20 movies-layout page-container">
				<h2 className="mb-10 text-3xl font-bold text-white">Now Playing</h2>
				<MovieList type={"now_playing"}></MovieList>
			</section>
			<section className="pb-20 movies-layout page-container">
				<h2 className="mb-10 text-3xl font-bold text-white">Top Rated</h2>
				<MovieList type={"top_rated"}></MovieList>
			</section>
			<section className="pb-20 movies-layout page-container">
				<h2 className="mb-10 text-3xl font-bold text-white">Trending</h2>
				<MovieList type={"popular"}></MovieList>
			</section>
        </>
    );
};

export default Homepage;