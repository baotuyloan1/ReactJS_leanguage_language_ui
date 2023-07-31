import { Button, Modal } from "react-bootstrap";
import CardIn4Word from "../CardIn4Word";
import { useNavigate } from "react-router-dom";
import { userGetNextWordToReviews } from "../../../api/user/UserVocabulary";

const MyModalReview = ({
  word,
  isCorrect,
  isShowModal,
  setShowModal,
  setIndexWord,
  setWords,
  setCurrentWord,
  words,
}) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={isShowModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {word.vocabularyId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          {isCorrect ? (
            <span className="text-success">Chúc mừng bạn, đã chính xác</span>
          ) : (
            <span className="text-danger">Sai rồi :(</span>
          )}
        </h4>
        <CardIn4Word word={word} playAudio={false} />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setShowModal(false);
            if (isCorrect) {
              const lengthWords = words.length;
              if (words[lengthWords - 1] === word) {
                navigate(-1);
              } else {
                setIndexWord((index) => {
                  setCurrentWord(words[++index]);
                  return index;
                });
              }
            } else {
              userGetNextWordToReviews()
                .then((res) => {
                  setWords(res.data);
                  setCurrentWord(res.data[0]);
                })
                .catch((err) => console.log(err));
            }
          }}
        >
          Tiếp tục
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModalReview;
