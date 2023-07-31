import { useState } from "react";
import { useLocation } from "react-router-dom";
import SelectAnswerReview from "./componentReview/SelectAnswerReview";
import ListenAnswerReview from "./componentReview/ListenAnswerReview";
import MeanAnswerReview from "./componentReview/MeanAnswerReview";

const UserReviewWord = () => {
  const { state } = useLocation();
  console.log(state);
  const [words, setWords] = useState(state);
  const [process, setProcess] = useState(0);
  const [indexWord, setIndexWord] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  return (
    <div>
      {words && (
        <div>
          {currentWord.learnTypes[0]?.type === "select" && (
            <SelectAnswerReview
              word={currentWord}
              setWords={setWords}
              setCurrentWord={setCurrentWord}
              words={words}
              setIndexWord={setIndexWord}
            ></SelectAnswerReview>
          )}

          {currentWord.learnTypes[0]?.type === "listen" && (
            <ListenAnswerReview
              word={currentWord}
              setWords={setWords}
              setCurrentWord={setCurrentWord}
              words={words}
              setIndexWord={setIndexWord}
            ></ListenAnswerReview>
          )}
          {currentWord.learnTypes[0]?.type === "mean" && (
            <MeanAnswerReview
              word={currentWord}
              setWords={setWords}
              setCurrentWord={setCurrentWord}
              words={words}
              setIndexWord={setIndexWord}
            ></MeanAnswerReview>
          )}
        </div>
      )}
    </div>
  );
};

export default UserReviewWord;
