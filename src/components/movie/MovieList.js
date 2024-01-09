import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetcher, apiKey } from '../../config';

const MovieList = ({ type = "now_playing" }) => {
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`, fetcher)
    const movies = data?.results || []

    return (
        <div className="movie-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {movies && movies.map(item => (
                    <SwiperSlide key={item.id}><MovieCard item={item}></MovieCard></SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;