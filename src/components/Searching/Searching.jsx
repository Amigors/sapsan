import React, { useState, useRef, useCallback } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import ListPhoto from "../ListPhoto/ListPhoto";
import axios from "axios";
import { url } from "../../api/api";
import style from "./Searching.module.scss";
import { Oval } from "react-loader-spinner";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

const Searching = () => {
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [showInputClose, setShowInputClose] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestCount, setRequestCount] = useState(0);
    const maxRequests = 1;
    const ref = useRef(null);

    const fetchData = useCallback(async () => {
        if (requestCount >= maxRequests) {
            setIsLoading(false)
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}${ref.current.value}&page=${currentPage}`);
            if (response.data.total_pages < 1) {
                setIsLoading(false)
                return;
            }
            setTotal(response.data.total);
            setTotalPages(response.data.total_pages)
            setImages(prevImages => [...prevImages, ...response.data.results]);
            setCurrentPage(currentPage + 1);
        } catch (error) {
            setRequestCount(requestCount + 1);
            setIsLoading(false);
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const [scrollRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage: currentPage <= totalPages,
        onLoadMore: fetchData,
        disabled: !isFetched,
    })

    const handleClick = () => {
        setIsFetched(true);
        setImages([]);
        setCurrentPage(1);
        setRequestCount(0)
        fetchData();
    };

    const changeInput = () => {
        if (ref.current.value) {
            setShowInputClose(true);
        } else {
            setShowInputClose(false);
        }
    };

    const handleCloseIcon = () => {
        setShowInputClose(false);
        ref.current.value = '';
    };


    return (
        <>
            <div className={isFetched ? style.searchBlock : style.searchBlock__empty}>
                <div className={style.searchBlock__input}>
                    <i className={style.searchBlock__searchIcon} aria-hidden='true'><CiSearch /></i>
                    <input
                        className={style.searchBlock__inputField}
                        ref={ref}
                        type="text"
                        onChange={changeInput}
                        placeholder="Телефоны, яблоки, груши..."
                    />
                    {showInputClose && <i className={style.searchBlock__closeIcon} onClick={handleCloseIcon}><IoMdCloseCircle /></i>}

                </div>
                <button
                    className={style.searchBlock__button}
                    type="submit"
                    onClick={handleClick}
                >
                    <span className={style.searchBlock__buttonText}>Искать</span>
                </button>
            </div>
            <div className={style.photosBlock} ref={scrollRef}>
                {isFetched && total > 0 && images.map((image, index) => (
                    <ListPhoto image={image} key={index} />
                ))}
                {isLoading && <Oval />}
                {!isLoading && isFetched && total === 0 && <div className={style.emptyFetch}>К сожалению поиск не дал результатов</div>}
            </div>
        </>
    );
};

export default Searching;
