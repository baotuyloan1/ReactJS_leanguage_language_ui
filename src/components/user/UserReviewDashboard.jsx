import axios from "axios";
import { useEffect, useState } from "react";
import { API_USER_NEXT_REVIEW_VOCABULARIES } from "../baseUrl";
import { error } from "jquery";
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";

const UserReviewDashBoard = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [restTime, setRestTime] = useState();
  const [diffTime, setDiffTime] = useState();

  const navigate = useNavigate();
  const handleOnTap = () => {
    navigate("/user/reviewVocabulary", { state: vocabularies });
  };
  useEffect(() => {
    axios
      .get(API_USER_NEXT_REVIEW_VOCABULARIES, { withCredentials: true })
      .then((res) => {
        setVocabularies(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (vocabularies.length > 0) {
      const timer = setInterval(() => {
        const currentTime = moment(new Date());
        const nextTime = moment(vocabularies[vocabularies.length - 1].endDate);
        const diff = nextTime.diff(currentTime);
        setDiffTime(diff);
        setRestTime(moment.duration(diff));
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [vocabularies]);

  console.log(diffTime);
  return (
    <div>
      {restTime && (
        <div class="container">
          <div>
            {diffTime > 2 &&
              `${restTime?.hours()}:${restTime.minutes()}:${restTime.seconds()}`}
          </div>
          <div> Chuẩn bị ôn tập {vocabularies.length} từ</div>
          <button
            disabled={diffTime > 2}
            className="btn btn-success"
            onClick={handleOnTap}
          >
            Ôn tập ngay
          </button>

        </div>
      )}
    </div>
  );
};

export default UserReviewDashBoard;
