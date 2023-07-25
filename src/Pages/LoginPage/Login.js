import React, { useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess ) {
      navigate("/dashboard/admin");
      toast.success("Logged in successfully")
    }

    dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      username,
      password:pass,
    };
    dispatch(login(adminData));
  };
  return (
    <>
      <div className="bk-color">
        <div className="center">
          <form onSubmit={handleSubmit}>
            <h1 className="login_dash">Login</h1>
            <div className="txt_field">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <span></span>
              <label>Admin Username</label>
            </div>

            <div className="txt_field">
              <input
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type="password"
                required
              />
              <span></span>
              <label>Password</label>
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Login;
