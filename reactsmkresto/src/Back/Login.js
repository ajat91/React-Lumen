import React from "react";
import { link } from "../Axios/Link";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const history = useHistory();

  const getToken = () => sessionStorage.getItem("token");
  async function login(data) {
    const res = await link.post("/login", data);
    //console.log(res.data.token);

    let token = await res.data.token;
    //console.log(res.data.data.email)

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", res.data.data.email);
    sessionStorage.setItem("level", res.data.data.level);

    reset();
    if (getToken() !== "undefined") {
      history.push("/admin");
      window.location.reload();
    } else {
      alert("Email Atau Password Anda Salah");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="mt-5 mx-auto col-4">
          <form onSubmit={handleSubmit(login)}>
            <div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Masukan Email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && "Email Wajib Diisi"}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Masukan Password"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && "Password Wajib Diisi"}
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
