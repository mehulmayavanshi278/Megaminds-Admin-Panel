import React, { useState } from "react";
import TokenHelper from "../../Helpers/TokenHelper";
import { toast } from "react-toastify";
import userService from "../../Services/user.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Login() {
  const history = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleLoginBtn = async () => {
    try {
      await loginSchema.validate(loginData, { abortEarly: false });
      console.log(loginData);
      const res = await userService.login(loginData);
      if (res?.status === 200) {
        console.log(res.data);
        TokenHelper.create("token", res.data.token);
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
      }
      const formattedErrors = err?.inner?.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
      setErrors(formattedErrors);
      console.log(formattedErrors);
    }
  };

  return (
    <div>
      <div className="bg-[#ecf0f4] w-full h-[100vh] relative pt-[100px]">
        <div className="w-[500px] absolute top-[50px] left-1/2 -translate-x-1/2 bg-white rounded-[20px] p-[35px]">
          <div>
            <h1 className="text-[26px] font-[650] font-sans">Login to account</h1>
            <p className="text-[16px] font-[350] font-sans">Enter your email and password to login</p>
          </div>
          <div className="mt-[40px]">
            <div>
              <p className="text-[16px] font-[650] font-sans">Email Address*</p>
              <input
                className={`mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px ${errors.email ? 'border-red-500' : ''}`}
                type="text"
                name="email"
                value={loginData.email}
                onChange={(e) => handleLoginOnChange(e)}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mt-[20px]">
            <div>
              <p className="text-[16px] font-[650] font-sans">Password*</p>
              <input
                className={`mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px ${errors.password ? 'border-red-500' : ''}`}
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleLoginOnChange(e)}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="mt-[20px]">
            <label className="flex items-center space-x-2">
              <input className="w-5 h-5 p-[10px]" type="checkbox" />
              <span className="text-base">keep me signed in</span>
            </label>
          </div>
          <div className="mt-[20px]" onClick={handleLoginBtn}>
            <p className="bg-[#6666eb] border border-[#6666eb] hover:text-[#6666eb] transition-all duration-200 hover:bg-[white] py-[12px] text-white w-full rounded-[10px] text-center text-[15px] font-[650]">Login</p>
          </div>
          <div className="mt-[20px]">
            <p className="text-[14px] text-[#89a589] text-center w-full">or continue with Google </p>
          </div>
          <div className="mt-[20px]">
            <p className="text-[16px] text-[black] text-center w-full">You don't have an account yet? <span className="text-[#6666eb] cursor-pointer" onClick={()=>{window.location.href='/signup'}}> Register Now </span> </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
