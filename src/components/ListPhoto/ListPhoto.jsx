import { useState } from "react";
import style from "./ListPhoto.module.scss";
import ReactModal from "react-modal";
import { IoIosClose } from "react-icons/io";
import { createPortal } from "react-dom";

const ListPhoto = ({ image, key }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className={style.photoBlock} onClick={handleModal}>
        <img key={key} className={style.photo} src={image.urls.regular} alt="photo" />
      </div>

      {createPortal(
        <ReactModal
          isOpen={showModal}
          className={style.photoModalBlock}
          onRequestClose={handleModal}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          style={{ overlay: { backgroundColor: 'rgba(0,0,0,0.3)' } }}
        >
          <IoIosClose className={style.closeButton} onClick={handleModal} />
          <img key={key} className={style.photoModal} onClick={handleModal} src={image.urls.full} alt="photo" />
        </ReactModal>, document.body)
      }
    </>
  );
};

export default ListPhoto;
