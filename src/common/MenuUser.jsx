import { Link, useNavigate } from "react-router-dom";
import "../styles/user/MenuUser.css";
import { logout } from "../api/auth";

const MenuUser = () => {
  const navigate = useNavigate();

  function handleLogout() {
    logout()
      .then((res) => {
        console.log(res);
        navigate("/auth/user/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <nav class="navbar navbar-expand navbar-light">
        <div class="navbar-nav">
          <Link class="nav-link" to={"/user/reviewDashBoard"}>
            Ôn tập
          </Link>
          <Link class="nav-link" to={"/user/courses"}>
            Học từ mới
          </Link>
          <Link class="nav-link" to={"/user/leanredWord"}>
            Các từ đã học
          </Link>
          <Link class="nav-link" href="#">
            Thống kê
          </Link>

          <Link class="nav-link" href="#" onClick={handleLogout}>
            Đăng xuất
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MenuUser;
