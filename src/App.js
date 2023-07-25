import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AdminCoursesComponent from "./components/admin/course/AdminCoursesComponent";
import HeaderADMIN from "./common/HeaderADMIN";
import LoginComponent from "./components/LoginComponent";
import AdminDashboardComponent from "./components/admin/AdminDashboardComponent";
import AdminWordsComponent from "./components/admin/word/AdminWordsComponent";
import CreateWordComponent from "./components/admin/word/CreateWord";
import CreateQuestionComponent from "./components/admin/question/CreateQuestionComponent";
import CreateTopicComponent from "./components/admin/topic/CreateTopicComponent";
import AdminListTopicComponent from "./components/admin/topic/AdminListTopicComponent";
import CreateCourse from "./components/admin/course/CreateCourse";
import AdminListQuestion from "./components/admin/question/AdminListQuestionComponent";
import MenuUser from "./common/MenuUser";
import UserReviewDashBoard from "./components/user/UserReviewDashboard";
import UserListCourses from "./components/user/courses/UserListCourses";
import UserListTopics from "./components/user/topics/UserListTopics";
import LearnNewWord from "./components/user/LearnNewWord";
import UserReviewWord from "./components/user/UserReviewWord";

const LayoutAdmin = () => (
  <>
    <HeaderADMIN />
    <Outlet />
  </>
);

const LayoutUser = () => (
  <>
    <MenuUser />
    <Outlet />
  </>
);

const routers = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <AdminDashboardComponent />,
      },
      {
        path: "words",
        element: <AdminWordsComponent />,
      },
      {
        path: "words/create/:id",
        element: <CreateWordComponent />,
      },
      {
        path: "courses/create",
        element: <CreateCourse />,
      },
      { path: "courses", element: <AdminCoursesComponent /> },

      {
        path: "courses/:id/addTopic",
        element: <CreateTopicComponent />,
      },
      { path: "topics", element: <AdminListTopicComponent /> },
      {
        path: "questions",
        element: <AdminListQuestion />,
      },
      {
        path: "questions/create/:id",
        element: <CreateQuestionComponent />,
      },
      {
        path: "words/:id/questions",
        element: <AdminListQuestion />,
      },
    ],
  },
  {
    element: <LayoutUser />,
    children: [
      { path: "/user/reviewDashBoard", element: <UserReviewDashBoard /> },
      { path: "", element: <UserReviewDashBoard /> },
      { path: "/user/courses", element: <UserListCourses /> },
      { path: "/user/courses/:id/topics", element: <UserListTopics /> },
      { path: "/user/topics/:id/vocabularies", element: <LearnNewWord /> },
      {
        path: "/user/reviewVocabulary",
        element: <UserReviewWord />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "admin/login",
        element: (
          <LoginComponent role="ROLE_ADMIN" successNavigate="/admin/courses" />
        ),
      },
      {
        path: "user/login",
        element: <LoginComponent role="ROLE_USER" successNavigate="/user" />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="container-fluid">
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
