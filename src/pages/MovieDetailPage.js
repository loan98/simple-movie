import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, apiKey } from '../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../components/movie/MovieCard';

const MovieDetailPage = () => {
    const {movieId} = useParams();
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, fetcher)
    if(!data) return null;
    const {backdrop_path, poster_path, title, genres, overview} = data;
    return (
        <>
            <div className="w-full h-[600px] relative">
                <div className="overlay absolute inset-0 bg-[rgba(0,0,0,0.7)]"></div>
                <div className="w-full h-full bg-no-repeat bg-cover" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`
                }}></div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} className="object-cover w-full h-full rounded-xl" />
                </div>
            <h1 className="mb-10 text-4xl font-bold text-center text-white">{title}</h1>
            {genres && 
            <div className="flex items-center justify-center mb-10 gap-x-5">
                {genres.map(item => (
                    <span className="px-4 py-2 border rounded-lg text-primary border-primary" key={item.id}>{item.name}</span>
                ))}
            </div>}
            <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">{overview}</p>
            <MovieCredits></MovieCredits>
            <MovieVideo></MovieVideo>
            <MovieSimillar></MovieSimillar>
        </>
    );
};

function MovieCredits() {
    const {movieId} = useParams();
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`, fetcher)
    
    if(!data) return null;
    const {cast} = data;
    if(!cast || cast.length <= 0) return null
    return (
        <div className="px-5 max-w-[1000px] mx-auto mb-10">
            <h2 className="mb-10 text-2xl text-center text-primary">Casts</h2>
            <div className="grid grid-cols-4 gap-5">
            {cast.slice(0,4).map(item => (
                <div className="cast-item" key={item.id}>
                    <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} 
                    className="w-full h-[300px] object-cover rounded-lg mb-3" alt="" />
                    <p className="text-center">{item.name}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

function MovieVideo() {
    const {movieId} = useParams();
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`, fetcher)
    
    if(!data) return null;
    const {results} = data;
    if(!results || results.length <= 0) return null;

    return (
        <div className="page-container">
            <h2 className="mb-10 text-2xl text-center text-primary">Trailers</h2>
            {results.slice(0,1).map(item => (
                <div key={item.id} className="w-full mb-10 aspect-video">
                    <iframe 
                        width="853" 
                        height="480" 
                        src={`https://www.youtube.com/embed/${item.key}`} 
                        title={item.name} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="object-fill w-full h-full">
                    </iframe>
                </div>
            ))}
        </div>
    )
}

function MovieSimillar() {
    const {movieId} = useParams();
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`, fetcher)
    
    if(!data) return null;
    const {results} = data;
    if(!results || results.length <= 0) return null;
    
    return (
        <div className="page-container">
            <h2 className="mb-10 text-2xl text-center text-primary">Related Movies</h2>
            <div className="movie-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {results && results.map(item => (
                    <SwiperSlide key={item.id}><MovieCard item={item}></MovieCard></SwiperSlide>
                ))}
            </Swiper>
        </div>
        </div>
    )
}

export default MovieDetailPage;