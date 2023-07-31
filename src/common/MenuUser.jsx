import { Link, useNavigate } from "react-router-dom";
import "../styles/user/MenuUser.css";
import { logout } from "../api/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/FirebaseConfig";
import { userPostDeviceToken } from "../api/user/UserNotification";
import { useEffect, useState } from "react";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

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
  const [permissionNotification, setPermissionNotification] = useState();
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      console.log("trong ham then", permission);
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log("granted roi");
        getToken(messaging, {
          vapidKey:
            "BDZjuFKTTLPW-0XsLqm93rbEFNCZMhDa7Q8bIKodMG4NH0uepZYEGbakh6SJIylMA1V-DwrsqAy41PwLqpXmwxs",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log(currentToken);
              userPostDeviceToken({
                deviceToken: currentToken,
                deviceType: "web",
              })
                .then(() => {})
                .catch((err) => console.log(err));
            } else {
              //show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

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
          <Link class="nav-link" to={"/user/learned-word"}>
            Các từ đã học
          </Link>
          <></>
          <Link class="nav-link" href="#">
            Thống kê
          </Link>
          <Link class="nav-link" href="#" onClick={handleLogout}>
            Đăng xuất
          </Link>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={Notification.permission === "granted"}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Trạng thái thông báo
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MenuUser;
