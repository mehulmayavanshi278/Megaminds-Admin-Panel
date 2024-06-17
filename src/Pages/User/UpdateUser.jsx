import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import * as yup from "yup";
import userService from "../../Services/user.service";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNo: yup.string().required("Phone number is required"),
});

function UpdateUser({ innerBodyColor, bodyColor  , singleUser}) {
  const [type, setType] = useState();
  const [tabType, setTabType] = useState();
  const [subTabType, setSubTabType] = useState();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const path = window.location.pathname.split("/");
    setType(path[1]);
    setTabType(path[2]);
    path.length > 3 && setSubTabType(path[3].split("%20").join(" "));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData({ ...updateUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(updateUserData, { abortEarly: false });
      setErrors({});
      console.log(updateUserData);
      const id = updateUserData._id;
      const res = await userService.update(id , updateUserData);
      if (res.status === 200) {
       
        toast.success(" User updated Successfully");
      }
      // Submit the form
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  const [updateUserData , setUpdateUserData] = useState({});

  const handleIncomingData = ()=>{
    setUpdateUserData({
        ...singleUser
    })
  }
  useEffect(()=>{
    handleIncomingData();
  },[]);

  return (
    <div className=" xl:w-[1000px] w-[90%] xl:h-[auto] h-[90vh] overflow-y-scroll mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      {/* <div className="flex flex-row justify-between">
        <div className="">
          <h1 className="text-[26px] font-[600] ">{subTabType}</h1>
        </div>
        <div className="flex flex-row justify-center gap-2 items-center">
          <p className="text-[13px] font-[400] hover:underline cursor-pointer">
            {type}
          </p>
          <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
          <p className="text-[13px] font-[400] hover:underline cursor-pointer">
            {tabType}
          </p>
          <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
          <p className="text-[13px] font-[400] hover:underline cursor-pointer">
            {subTabType}
          </p>
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className="mt-3">
        <div
          className={`xl:grid grid-cols-[auto,1fr] ${innerBodyColor} rounded-[15px] shadow-sm p-[20px] gap-x-[80px]`}
        >
          <div className="">
            <div className="">
              <p className="text-[28px] font-sans font-[550]">Account</p>
              <p className="mt-2  font-sans font-[400]">
                Fill in the information below to add a new account
              </p>
            </div>
          </div>

          <div className="">
            <div className="xl:grid grid-cols-2 gap-[10px]">
              <div className="">
                <p className="text-[15px] font-[700] font-sans">First Name*</p>
                <input
                  className={`mt-2 w-full px-[6px] ${innerBodyColor} py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  name="firstName"
                  value={updateUserData?.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
                {errors.firstName && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="">
                <p className="text-[15px] font-[700] font-sans">Last Name*</p>
                <input
                  className={`mt-2 w-full px-[6px] ${innerBodyColor} py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  name="lastName"
                  value={updateUserData?.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[15px] font-[700] font-sans">Email*</p>
              <input
                className={` ${innerBodyColor} mt-2 w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                type="email"
                name="email"
                value={updateUserData?.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div className="mt-3">
              <p className="text-[15px] font-[700] font-sans">Phone No*</p>
              <input
                className={` ${innerBodyColor} mt-2 w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                type="text"
                name="phoneNo"
                value={updateUserData?.phoneNo}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
              {errors.phoneNo && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.phoneNo}
                </div>
              )}
            </div>

            {/* <div className="mt-3">
              <p className="text-[16px] font-[500] font-sans">Role*</p>
              <FormControl fullWidth error={errors.role}>
                <Select
                  labelId="role-select-label"
                  name="role"
                  value={formValues.role}
                  onChange={handleChange}
                  fullWidth
                >
                  {["User", "Admin"].map((elm, id) => (
                    <MenuItem key={id} value={elm}>
                      {elm}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </div> */}



            <div className="mt-5">
              <Button type="submit" variant="contained" color="primary">
                save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
