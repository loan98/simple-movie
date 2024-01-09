import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const Banner = () => {
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=78bdbcb30d6d548952b5ffb773812d3d`, fetcher)
    const movies = data?.results || []
    return (
        <section className="banner h-[500px] page-container mb-20 overflow-hidden">
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {movies && movies.map(item => (
                    <SwiperSlide key={item.id}><BannerItem item={item}></BannerItem></SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

function BannerItem({item}) {
    const { id, title, poster_path } = item;
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-full rounded-lg">
            <div className="overlay absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <img className="object-cover object-top w-full h-full rounded-lg" 
                src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} />
            <div className="absolute w-full text-white left-5 bottom-5">
                <h2 className="mb-5 text-3xl font-bold">{title}</h2>
                <div className="flex items-center mb-8 gap-x-3">
                    <span className="px-4 py-2 border border-white rounded-md">Action</span>
                    <span className="px-4 py-2 border border-white rounded-md">Avengers</span>
                    <span className="px-4 py-2 border border-white rounded-md">Dramma</span>
                </div>
                <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
            </div>
        </div>
    )
}

export default Banner;