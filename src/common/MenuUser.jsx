import { Link, useNavigate } from "react-router-dom";
import "../styles/user/MenuUser.css";
import { logout } from "../api/auth";
import axios from "axios";

async function subscribe1() {
  const notificationPermission = await Notification.requestPermission();
  if (notificationPermission === "granted") {
    const registration = await navigator.serviceWorker.getRegistration();

    const subscription = await registration?.pushManager.subscribe({
      userVisibleOnly: false,
      applicationServerKey: urlB64ToUnit8Array(
        "BMxiyESR0-qd2q2XSQrbDUvtCQJW-PXAdbX-u2eF_Ph5maD-X2R4BOKeAy59RAm2Aii9sWMZFv024aGQX-hAsg8"
      ),
    });
    console.log(subscription);

    if (subscription) {
      console.log(subscription);
      axios.post(JSON.parse(JSON.stringify(subscription)));
    } else {
    }
  } else {
    console.log("huy");
  }
}

function urlB64ToUnit8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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

  // subscribe1();
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
