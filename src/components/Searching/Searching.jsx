import { useRef } from "react";
import { useState } from "react";
import ListPhoto from "../ListPhoto/ListPhoto";
import axios from "axios";
import { url } from "../../api/api";
import style from "./Searching.module.scss";
import { Oval } from "react-loader-spinner";
import { CiSearch } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";

const Searching = () => {
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false)
    const [showInputClose, setShowInputClose] = useState(false)
    const ref = useRef(null);

    const handleClick = async () => {
        try {
            setImages([]);
            setTotal(null);
            setIsLoading(true);
            setIsFetched(true)
            const response = await axios.get(url + `${ref.current.value}`);
            setTotal(response.data.total);
            if (response.data.total_pages > 1) {
                for (let i = 1; i < response.data.total_pages; i++) {
                    const resp = await axios.get(
                        url + `${ref.current.value}` + "&page=" + `${i}`
                    );
                    setImages((images) => images.concat(resp.data.results));
                }
            } else if (response.data.total_pages === 1) {
                setImages(response.data.results);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    };

    const changeInput = () => {
        if (ref.current.value) {
            setShowInputClose(true)
        } else {
            setShowInputClose(false)
        }
    }
    const handleCloseIcon = () => {
        setShowInputClose(false)
        ref.current.value = null
    }

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
            <div className={style.photosBlock}>
                {isFetched &&
                    (total > 0 ?
                        (images.map((image, index) => {
                            return <ListPhoto image={image} key={index} />;
                        }))
                        :
                        (
                            <div className={style.emptyFetch}>К сожалению поиск не дал результатов</div>
                        ))
                }
                {isLoading && <Oval />}
            </div>
        </>
    );
};

export default Searching;
