import {useState} from "react";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {signIn} from "../api/auth";

const isContainRequireRole = (rolesRes, roleRequire) => {
    return rolesRes.some((role) => {
        return role === roleRequire;

    });
};
const LoginComponent = ({role: requireRole, successNavigate}) => {
    const [account, setAccount] = useState({username: "", password: ""});
    const cookies = new Cookies();
    const navigate = useNavigate();

    const setParams = (event) => {
        setAccount({...account, [event.target.name]: event.target.value});
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signIn(account)
            .then((res) => {
                console.log("Required role", requireRole);
                console.log("Own role", res.data.roles);
                console.log(isContainRequireRole(res.data.roles, requireRole));
                if (isContainRequireRole(res.data.roles, requireRole)) {
                    navigate(successNavigate);
                } else {
                    alert("Người dùng không đủ quyền truy cập");
                }
            })
            .catch((error) => {
                console.log((error))
                if (error.response.status === 401) {
                    alert("Sai tên đăng nhập hoặc mật khẩu");
                }
            });
        // axios
        //   .post(API_AUTH_LOGIN, account, {
        //     withCredentials: true,
        //   })
        //   .then((res) => {
        //     navigate("/user/reviewDashBoard");
        //   })
        //   .catch((error) => {
        //     if (error.response && error.response.status === 401) {
        //       alert("Sai tên đăng nhập hoặc mật khẩu");
        //     }
        //     console.log(error);
        //   });
    };
    return (
        <div className="container border border-secondary-subtle rounded-1 p-3  m-5">
            <form onSubmit={handleLogin}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={(e) => setParams(e)}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => setParams(e)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                            <label className="form-check-label" htmlFor="gridCheck1">
                                Example checkbox
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginComponent;
