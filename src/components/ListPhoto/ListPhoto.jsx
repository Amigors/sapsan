import { useState } from "react";
import style from "./ListPhoto.module.scss";
import ReactModal from "react-modal";

const ListPhoto = ({ image, key }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className={style.photoBlock} onClick={handleModal}>
        <img className={style.photo} src={image.urls.regular} />
      </div>

      <ReactModal
        isOpen={showModal}
        style={{ overlay: { backgroundColor: "#000000", opacity: "30%" } }}
        onRequestClose={handleModal}
        shouldCloseOnOverlayClick={true}
      >
        <img className={style.photoModal} src={image.urls.full} />
      </ReactModal>
    </>
  );
};

export default ListPhoto;
