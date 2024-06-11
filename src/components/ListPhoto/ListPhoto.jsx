import style from './ListPhoto.module.scss'

const ListPhoto = ({ image, key }) => {
    console.log('image', image)
    return (
        <>
            <div className={style.photoBlock}>
                <img className={style.photo} src={image.urls.regular} />
            </div>
        </>
    )
}

export default ListPhoto