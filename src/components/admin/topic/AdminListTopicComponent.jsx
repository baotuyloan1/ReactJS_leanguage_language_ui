import {useEffect, useState} from "react";
import {RESOURCE_IMG_COURSE_URL} from "../../baseUrl";
import {Link, useSearchParams} from "react-router-dom";
import {adminGetTopics} from "../../../api/admin/AdminTopic";
import {adminGetTopicsByCourseId} from "../../../api/admin/AdminCourse";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Button} from "react-bootstrap";

const AdminListTopicComponent = () => {
    const [topics, setTopics] = useState([]);
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    const [deleteIdTopic, setDeleteIdTopic] = useState();

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (searchParams.get("courseId") !== null) {
            adminGetTopicsByCourseId(searchParams.get("courseId"))
                .then((res) => setTopics(res.data))
                .catch((error) => console.log(error));
        } else {
            adminGetTopics()
                .then((res) => {
                    setTopics(res.data);
                })
                .catch((error) => console.log(error));
        }
    }, [searchParams]);

    const handleDelete = () => {
        console.log(deleteIdTopic);
        setOpen(false);
    }
    const handleConfirmDelete = (id) => {
        setOpen(true)
        setDeleteIdTopic(id);

        // axios
        //   .delete(`${API_ADMIN_TOPICS}/${id}`)
        //   .then(() => {
        //     setTopics((topics) => topics.filter((topic) => topic.id !== id));
        //   })
        //   .catch((errors) => {
        //     console.log(errors);
        //   });

    };

    return (
        <div className="container-fluid">
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <h2 className="text-center">
                Topic List {searchParams.get("courseName")}
            </h2>
            {/*
      <Link
        to="/admin/courses/create"
        type="button"
        className="btn btn-success"
      >
        Add new topic
      </Link> */}

            <br/>
            <br/>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Img</th>
                    <th>Tiêu đề tiếng việt</th>
                    <th>Tiêu đề tiếng anh</th>
                    <th>Số lượng từ vựng</th>
                    <th>ID khóa học</th>
                    <th>Tên khóa học</th>
                    <th>Action</th>
                    <th>Action Từ vựng</th>
                </tr>
                </thead>
                <tbody>
                {topics &&
                    topics.length > 0 &&
                    topics.map((topic) => (
                        <tr key={topic.id}>
                            <td>{topic.id}</td>
                            <td>
                                <img src={`${RESOURCE_IMG_COURSE_URL}/${topic.img}`}></img>
                            </td>
                            <td>{topic.titleVn}</td>
                            <td>{topic.titleEn}</td>
                            <td>{topic.numberWords}</td>
                            <td>{topic.course?.id}</td>
                            <td>{topic.course?.title}</td>

                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={(e) => handleConfirmDelete(topic.id)}
                                >
                                    Delete topic
                                </button>
                                <button className="btn btn-primary">Edit topic</button>
                            </td>

                            <td>
                                <Link
                                    to={`/admin/words/create/${topic.id}?topicName=${topic.titleEn}`}
                                    className="btn btn-success"
                                >
                                    Thêm từ
                                </Link>
                                <Link
                                    to={"/admin/words?topicId=" + topic.id}
                                    className="btn btn-primary"
                                >
                                    Xem các từ
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminListTopicComponent;
