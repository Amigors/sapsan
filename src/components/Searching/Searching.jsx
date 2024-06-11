import { useRef } from "react"
import { useState } from "react"
import ListPhoto from "../ListPhoto/ListPhoto"
import axios from "axios"
import { url } from "../../api/api"
import style from './Searching.module.scss'

const Searching = () => {
    const [images, setImages] = useState([])
    const ref = useRef(null)
    console.log(ref)

    const handleClick = async () => {
        try {
            const response = await axios.get(url + `${ref.current.value}`)
            if (response.data.total_pages > 1) {
                for (let i = 1; i <= response.data.total_pages; i++) {
                    const resp = await axios.get(url + `${ref.current.value}` + '&page=' + `${i}`)
                    setImages(resp.data)
                }
            } else if (response.data.total_pages === 1) {

            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className={images.total > 0 ? style.searchBlock : style.searchBlock__empty}>
                <input className={style.searchBlock__input} ref={ref} type="text" placeholder="Телефоны, яблоки, груши..." />
                <button className={style.searchBlock__button} type="submit" onClick={handleClick}><span className={style.searchBlock__buttonText}>Искать</span></button>
            </div>
            {console.log(' 29 str', images)}
            <div className={style.photosBlock}>
                {images.total > 0 && images.results.map((image, index) => {
                    return <ListPhoto image={image} key={index} />
                })
                }
            </div>
        </>
    )
}

export default Searching