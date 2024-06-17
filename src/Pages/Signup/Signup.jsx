import { Button } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup';
import userService from '../../Services/user.service';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

function Signup() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    keepSignedIn: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      console.log(formValues);
      const res = await userService.signup(formValues);
      if (res.status === 200) {
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          phoneNo: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        toast.success(" User Created Successfully");
        window.location.href='/login'
      }
    } catch (err) {

      if (err.response && err.response.status === 400) {
        toast.error(err?.response?.data?.message);
        return;
      }

      const formattedErrors = {};
      err?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="bg-[#ecf0f4] w-full min-h-[100vh] relative py-[50px]">
      <div className="w-[500px] mx-auto bg-white rounded-[20px] p-[35px]">
        <div>
          <h1 className="text-[26px] font-[650] font-sans">Create your account</h1>
          <p className="text-[16px] font-[350] font-sans">Enter your personal details to create account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-[40px]">
          <div className="grid grid-cols-[1fr,1fr] gap-[15px]">
            <div>
              <p className="text-[16px] font-[650] font-sans">First Name*</p>
              <input
                className="mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px"
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
            </div>
            <div>
              <p className="text-[16px] font-[650] font-sans">Last Name*</p>
              <input
                className="mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px"
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
            </div>
          </div>

          <div className="mt-[20px]">
            <p className="text-[16px] font-[650] font-sans">Email Address*</p>
            <input
              className="mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px"
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>
          <div className="mt-[20px]">
            <p className="text-[16px] font-[650] font-sans">Phone*</p>
            <input
              className="mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px"
              type="number"
              name="phoneNo"
              value={formValues.phoneNo}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            {errors.phoneNo && <div className="text-red-500 text-sm mt-1">{errors.phoneNo}</div>}
          </div>

          <div className="mt-[20px]">
            <p className="text-[16px] font-[650] font-sans">Password*</p>
            <input
              className="mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>

          <div className="mt-[20px]">
            <p className="text-[16px] font-[650] font-sans">Confirm Password*</p>
            <input
              className="mt-2 w-full px-[20px] py-[11px] border-solid outline-none rounded-[10px] border border-1px"
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
          </div>

          <div className="mt-[20px]">
            <label className="flex items-center space-x-2">
              <input
                className="w-5 h-5 p-[10px]"
                type="checkbox"
                name="keepSignedIn"
                checked={formValues.keepSignedIn}
                onChange={handleChange}
              />
              <span className="text-base">Keep me signed in</span>
            </label>
          </div>

          <div className="mt-[20px]">
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </div>

          <div className="mt-[20px] text-center">
            <p className="text-[14px] text-[#89a589]">or continue with Google</p>
          </div>

          <div className="mt-[20px] text-center">
            <p className="text-[16px] text-black">
              Already have an account ? <span className="text-[#6666eb] cursor-pointer" onClick={()=>{window.location.href='/login'}}>login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
