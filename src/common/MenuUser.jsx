import { Link } from "react-router-dom";
import "../styles/user/MenuUser.css";
const MenuUser = () => {
  return (
    <div>
      <nav class="navbar navbar-expand navbar-light">
        <div class="navbar-nav">
          <Link class="nav-link" to={"/user/reviewDashBoard"}>
            Ôn tập
          </Link>
          <Link class="nav-link" to={"/user/categories"}>
            Học từ mới
          </Link>
          <Link class="nav-link" to={"/user/leanredWord"}>
            Các từ đã học
          </Link>
          <Link class="nav-link" href="#">
            Thống kê
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MenuUser;
