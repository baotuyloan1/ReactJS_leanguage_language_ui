import { RESOURCE_IMG_COURSE_URL } from "../../baseUrl";

export const UserTopicItem = ({ topic }) => {
  return (
    <div className="theme">
      <div className="col-12">
        <div className="component-card">
          <div className="image-container">
            <img
              src={`${RESOURCE_IMG_COURSE_URL}/${topic.img}`}
              alt="Component 2"
            />
          </div>
          <div className="card-info">
            <h5>{topic.titleEn}</h5>
            <div className="content">
              <p className="text-muted mb-2">{topic.titleVn}</p>
              <p>{topic.description}</p>
              <p className="date-time">Ngày giờ: 2023-07-25 03:45 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
