import { Button, Modal } from "react-bootstrap";
import CardIn4Word from "../CardIn4Word";
import { useState } from "react";

const MyModal = ({ title, word, handleHide, show, handleNext, isCorrect }) => {
  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          {isCorrect ? (
            <span className="text-success">Chúc mừng bạn, đã chính xác</span>
          ) : (
            <span className="text-danger">Sai rồi</span>
          )}
        </h4>
        <CardIn4Word word={word} playAudio={false} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Close
        </Button>
        {isCorrect && (
          <Button variant="primary" onClick={handleNext}>
            Tiếp tục
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
