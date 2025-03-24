import React from "react";
import UploadImage from "../uploadImage";
import "./modal.css";

function Modal({ closeModal, onUpload }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="align-txt-modal">
          <h2>Upload de Imagem</h2>
          <button onClick={closeModal} className="close-modal-button">
            X
          </button>
        </div>
        <UploadImage onUpload={onUpload} /> {/* Passa a função corretamente */}
      </div>
    </div>
  );
}

export default Modal;
