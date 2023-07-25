import { API_AUDIO_PLAY, RESOURCE_IMG_WORD_URL } from "../baseUrl";
import { useEffect, useState } from "react";

const CardIn4Word = ({ word, playAudio }) => {
  const [audio, setAudio] = useState();

  const [audioSentence, setAudioSentence] = useState();

  useEffect(() => {
    console.log("a");
    setAudio((current) => {
      const audio1 = new Audio(API_AUDIO_PLAY + "/" + word.audioWord);
      if (playAudio) {
        audio1.play();
      }
      return audio1;
    });

    setAudioSentence(new Audio(API_AUDIO_PLAY + "/" + word.audioSentence));
  }, []);

  const handlePlayAudioWord = () => {
    audio.play();
  };

  const handlePlayAudioSentence = () => {
    audioSentence.play();
  };
  return (
    <div className="">
      <div className=" card">
        <img
          src={RESOURCE_IMG_WORD_URL + "/" + word.img}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{word.word}</h5>
            <span className="px-3">({word.type})</span>
            <span className="px-3">{word.ipa}</span>
            <button onClick={handlePlayAudioWord}>
              <i className="bi bi-volume-up-fill"></i>
            </button>
          </div>

          <div className="d-flex" style={{ width: "100%" }}>
            <div className="card-text" style={{ width: "100%" }}>
              <p>{word.meaningWord}</p>
              <div className="d-flex justify-content-between">
                <p>{word.sentence}</p>

                <button
                  onClick={handlePlayAudioSentence}
                  style={{ height: "30px" }}
                >
                  <i className="bi bi-volume-up-fill"></i>
                </button>
              </div>
              <p>{word.meaningSentence}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardIn4Word;
