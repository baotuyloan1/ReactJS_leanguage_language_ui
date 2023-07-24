import {Link, useNavigate} from "react-router-dom";
import {logout} from "../api/auth";

const HeaderADMIN = () => {
    const navigate = useNavigate();

    function handleLogout() {
        logout().then(res => {
            console.log(res)
            navigate("/auth/admin/login")

        }).catch(err => console.log(err));
    }

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark"
                data-bs-theme="dark"
            >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        ADMIN UI
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <Link
                                    to={"/admin/"}
                                    className="nav-link active"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Vocabulary
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/admin/words"}>
                                            List vocabularies
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    {/* <li>
                    <Link className="dropdown-item" to={"/admin/words/create"}>
                      Add vocabulary
                    </Link>
                  </li> */}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Courses
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/admin/courses"}>
                                            List courses
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={"/admin/courses/create"}
                                        >
                                            Add courses
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Topic
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/admin/topics"}>
                                            List topics
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    {/* <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin/topics/create"}
                    >
                      Create topic
                    </Link>
                  </li> */}
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Questions
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/admin/questions"}>
                                            List Question
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    {/* <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin/questions/create"}
                    >
                      Create question
                    </Link>
                  </li> */}
                                </ul>
                            </li>
                        </ul>
                        <button className="btn btn-primary" onClick={handleLogout}>Đăng xuất</button>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default HeaderADMIN;
