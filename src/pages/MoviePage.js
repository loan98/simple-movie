import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../config';
import MovieCard from '../components/movie/MovieCard';
import useDebound from '../hooks/useDebound';
import ReactPaginate from 'react-paginate';

const itemsPerPage = 20;

const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=78bdbcb30d6d548952b5ffb773812d3d&page=${nextPage}`);

    const filterDebound = useDebound(filter, 500);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }
    const { data, error, isLoading } = useSWR(url, fetcher)
    const loading = !data && !error;

    useEffect(() => {
        if (filterDebound) {
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=78bdbcb30d6d548952b5ffb773812d3d&query=${filter}&page=${nextPage}`)
        } else {
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=78bdbcb30d6d548952b5ffb773812d3d&page=${nextPage}`)
        }
    }, [filterDebound, nextPage])

    const movies = data?.results || []

    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };

    return (
        <div className="page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input type="text" placeholder="Type here to search..."
                        className="w-full p-4 text-white outline-none bg-slate-800"
                        onChange={handleFilterChange}
                    />
                </div>
                <button className="p-4 text-white bg-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </button>
            </div>

            {loading && <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>}
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies && movies.map(item => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>

            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
    );
};

export default MoviePage;