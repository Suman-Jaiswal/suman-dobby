import React from "react";
import { Modal } from "react-bootstrap";

export default function Demo({ img, showModal, setShowModal }) {

   console.log(showModal);
   return (
      <>
         <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>{img.title}</Modal.Header>
            <Modal.Body>
               <img src={img.buffer} alt="" style={{
                  width: '100%',
               }} />
            </Modal.Body>
         </Modal>
      </>
   );

}
