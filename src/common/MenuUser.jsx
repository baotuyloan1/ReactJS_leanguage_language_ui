import { Link, useNavigate } from "react-router-dom";
import "../styles/user/MenuUser.css";
import { logout } from "../api/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/FirebaseConfig";
import { userPostDeviceToken } from "../api/user/UserNotification";

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

let permissionGranted = Notification.permission;

function requestPermission() {
  console.log(permissionGranted);
  console.log("AAAA", Notification.permission);
  if (permissionGranted !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        permissionGranted = "denied";
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
                .then(() => {
                  alert(
                    "Đặt thông báo thành công, hãy nhớ học bài đúng giờ nhé"
                  );
                })
                .catch((err) => console.log(err));
            } else {
              //show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => console.log(err));
      } else {
        console.log("chưa có quyền thông báo");
      }
    });
  }
}

const MenuUser = () => {
  requestPermission();

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
