import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const MovieCard = ({ item }) => {
    const { id, title, release_date, vote_average, poster_path } = item;
    const navigate = useNavigate()
    return (
        <div className="flex flex-col h-full p-3 text-white rounded-lg movie-card bg-slate-800">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                className="w-full h-[250px] rounded-lg object-cover mb-5" alt={title} />
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <div className="flex items-center justify-between mb-10 text-sm opacity-50">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>
                <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
            </div>

        </div>
    );
};

export default MovieCard;