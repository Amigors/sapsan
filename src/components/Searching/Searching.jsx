import { useRef } from "react";
import { useState } from "react";
import ListPhoto from "../ListPhoto/ListPhoto";
import axios from "axios";
import { url } from "../../api/api";
import style from "./Searching.module.scss";
import { Oval } from "react-loader-spinner";

const Searching = () => {
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  const handleClick = async () => {
    try {
      setImages([]);
      setTotal(null);
      setIsLoading(true);
      const response = await axios.get(url + `${ref.current.value}`);
      setTotal(response.data.total);
      if (response.data.total_pages > 1) {
        for (let i = 1; i <= response.data.total_pages; i++) {
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

  console.log(total);
  return (
    <>
      <div className={total > 0 ? style.searchBlock : style.searchBlock__empty}>
        <input
          className={style.searchBlock__input}
          ref={ref}
          type="text"
          placeholder="Телефоны, яблоки, груши..."
        />
        <button
          className={style.searchBlock__button}
          type="submit"
          onClick={handleClick}
        >
          <span className={style.searchBlock__buttonText}>Искать</span>
        </button>
      </div>
      {console.log(" 29 str", images)}

      <div className={style.photosBlock}>
        {total > 0 &&
          images.map((image, index) => {
            return <ListPhoto image={image} key={index} />;
          })}
        {isLoading && <Oval />}
      </div>
    </>
  );
};

export default Searching;
