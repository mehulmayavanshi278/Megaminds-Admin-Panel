import React, { useEffect, useState, useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Select, MenuItem, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import productService from "../../Services/product.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const categories = [
  "Antioxidants",
  "Ayurvedic",
  "Digestive Health",
  "General Health",
  "Herbal Speciality Supplements",
  "Men Health",
  "Organic",
  "Personal Care",
  "Sexual Health",
  "Vitamines And Minarels",
  "Women Health",
];

export const tags = ["mehul", "mehul", "mehul"];

function AddnewProduct({ innerBodyColor, bodyColor , singleProductData}) {
  const history = useNavigate();
  const fileInputRef = useRef(null);
  const [newProductData, setNewProductData] = useState({
    name:"",
    productName: "",
    category: "",
    tags: "",
    description: "",
    price: "",
    dummyPrice: "",
    vendorName: "",
    vendorContact: "",
    weight: "",
    dimension: "",
    stock: "",
    status: "",
    images: [],
  });

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleImageRemove = (index) => {
    setNewProductData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async() => {
    // Handle form submission, e.g., send data to an API

    const formData = new FormData();

    formData.append("name", newProductData.name);
    formData.append("category", [newProductData.category]);
    formData.append("tags", newProductData.tags);
    formData.append("description", newProductData.description);
    formData.append("price", newProductData.price);
    formData.append("dummyPrice", newProductData.dummyPrice);


    formData.append("vendorName", newProductData?.vendorName);
    formData.append("vendorContact", newProductData?.vendorContact);


 
    formData.append("weight", newProductData?.weight);
    formData.append("dimension", newProductData?.dimension);

    formData.append("stock", newProductData.stock);
    formData.append("status", newProductData.status);

    newProductData.images.forEach((image, index) => {
      formData.append('images', image);
    });

    try{
     const res = await productService.createProduct(formData);
     if(res.status===200){
      
      toast.success("Product Added")
     }
    }catch(err){
      console.log(err);
    }

    console.log(newProductData);
  };

  const [type, setType] = useState();
  const [tabType, setTabType] = useState();
  const [subTabType, setSubTabType] = useState();

  useEffect(() => {
    const path = window.location.pathname.split("/");
    setType(path[1]);
    setTabType(path[2]);
    path.length > 3 && setSubTabType(path[3].split("%20").join(" "));
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex flex-row justify-between">
          <div className="">
            <h1 className="text-[26px] font-[600] ">{subTabType}</h1>
          </div>
          <div className="flex flex-row justify-center gap-2 items-center">
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{window.location.href='/'}}>
              {type}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer" onClick={()=>{ window.location.href = '/Dashboard/Ecommerce/product list'}}>
              {tabType}
            </p>
            <ArrowForwardIosIcon style={{ fontSize: "13px" }} />
            <p className="text-[13px] font-[400] hover:underline cursor-pointer">
              {subTabType}
            </p>
          </div>
        </div>
        <div className="grid xl:grid-cols-[1fr,1fr] grid-cols-1 gap-[15px] mt-[20px]">
          <div
            className={`${innerBodyColor} shadow-sm rounded-[15px] p-[20px]`}
          >
            <div className="">
              <div className="">
                <p className="text-[16px] font-[500] font-sans">
                  Product Name*
                </p>
                <input
                  className={`${innerBodyColor} mt-2 w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  name="name"
                  value={newProductData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-[1fr,1fr] gap-[15px] mt-5">
              <div className="">
                <p className="text-[16px] font-[500] font-sans">Category</p>
                <div className={`${innerBodyColor} mt-2`}>
                  <Select
                    className={`${innerBodyColor}`}
                    sx={{ color: "#cbb9b9" }}
                    name="category"
                    value={newProductData.category}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    {categories.map((elm, id) => (
                      <MenuItem key={id} value={elm}>
                        {elm}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="">
                <p className="text-[16px] font-[700]">Tags</p>
                <div className="mt-2">
                  <Select
                    labelId="tags-select-label"
                    sx={{ color: "#cbb9b9" }}
                    name="tags"
                    value={newProductData.tags}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    {tags.map((elm, id) => (
                      <MenuItem key={id} value={elm}>
                        {elm}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="">
                <p className="text-[16px] font-[500] font-sans">Description*</p>
                <textarea
                  rows="7"
                  className={`${innerBodyColor} mt-2 w-full px-[10px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  name="description"
                  value={newProductData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-2 gap-[15px]">
                <div className="">
                  <p className="text-[16px] font-[500] font-sans">Price*</p>
                  <input
                    className={`${innerBodyColor} mt-2 w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                    type="number"
                    name="price"
                    value={newProductData.price}
                    onChange={handleInputChange}
                    placeholder="Enter Price"
                  />
                </div>
                <div className="">
                  <p className="text-[16px] font-[500] font-sans">
                    Dummy Price
                  </p>
                  <input
                    className={`${innerBodyColor} mt-2 w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                    type="number"
                    name="dummyPrice"
                    value={newProductData.dummyPrice}
                    onChange={handleInputChange}
                    placeholder="Dummy Price"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="">
                  <p className="text-[16px] font-[500] font-sans">
                    Vendor Info*
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-[15px]">
                  <div className="">
                    <input
                      className={`${innerBodyColor} mt-[6px] w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                      type="text"
                      name="vendorName"
                      value={newProductData.vendorName}
                      onChange={handleInputChange}
                      placeholder="Vendor Name"
                    />
                  </div>
                  <div className="">
                    <input
                      className={`${innerBodyColor} mt-[6px] w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                      type="number"
                      name="vendorContact"
                      value={newProductData.vendorContact}
                      onChange={handleInputChange}
                      placeholder="Vendor Contact"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${innerBodyColor} shadow-sm rounded-[15px] p-[20px]`}
          >
            <div className="">
              <div className="">
                <p className="text-[16px] font-[500] font-sans">
                  Upload Images*
                </p>
                <div className="grid grid-cols-6 gap-[15px] mt-3">
                  <div className="border relative border-dashed border-[blue] col-span-2 border-[2px] rounded-[5px] h-[250px]">
                    <div
                      className="flex w-full flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      onClick={handleDivClick}
                    >
                      <CloudUploadIcon
                        style={{ fontSize: "40px", color: "green" }}
                      />
                      <p className="text-center text-[14px] text-[blue] hover:underline cursor-pointer">
                        Upload <span>product images</span>
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                  </div>
                  <div className="col-span-4 border border-[1px] p-[15px]">
                    <div className="flex flex-wrap gap-[10px] justify-start">
                      {newProductData.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-[70px] h-[70px] p-1"
                        >
                          <img
                            className="w-full h-full object-cover rounded-md"
                            src={URL.createObjectURL(image)}
                            alt={`Product ${index}`}
                          />
                          <CloseIcon
                            className="absolute  rounded-[5px] shadow-md bg-[white] top-1 right-1 cursor-pointer"
                            onClick={() => handleImageRemove(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="">
                  <p className="text-[16px] font-[500] font-sans">
                    Additional Information
                  </p>
                  <div className="grid grid-cols-2 gap-[15px]">
                    <div className="">
                      <input
                        className={`${innerBodyColor} mt-[6px] w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                        type="text"
                        name="weight"
                        value={newProductData.weight}
                        onChange={handleInputChange}
                        placeholder="Weight"
                      />
                    </div>
                    <div className="">
                      <input
                        className={`${innerBodyColor} mt-[6px] w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                        type="text"
                        name="dimension"
                        value={newProductData.dimension}
                        onChange={handleInputChange}
                        placeholder="Dimension"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-5">
                      <div className="">
                        <p className="text-[16px] font-[500] font-sans">
                          Total Stock*
                        </p>
                        <input
                          className={`${innerBodyColor} mt-[6px] w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                          type="number"
                          name="stock"
                          value={newProductData.stock}
                          onChange={handleInputChange}
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-[16px] font-sans font-[500]">Status</p>
                      <div className="mt-2">
                        <Select
                          labelId="status-select-label"
                          name="status"
                          value={newProductData.status}
                          onChange={handleInputChange}
                          fullWidth
                        >
                          {["Available", "Not Available"].map((elm, id) => (
                            <MenuItem key={id} value={elm}>
                              {elm}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Add Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddnewProduct;
