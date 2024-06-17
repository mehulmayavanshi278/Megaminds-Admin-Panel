import React , {useState , useEffect} from 'react'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {  Button } from "@mui/material";

function Addcategory({innerBodyColor , bodyColor}) {

    const [type, setType] = useState();
    const [tabType, setTabType] = useState();
    const [subTabType, setSubTabType] = useState();
    useEffect(() => {
      const path = window.location.pathname.split("/");
      console.log(path);
      setType(path[1]);
      setTabType(path[2]);
      path.length > 3 && setSubTabType(path[3].split("%20").join(" "));
    }, []);

  return (
    <div>
      <div className='w-[600px]'>
      <div className="flex flex-row justify-between">
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
        </div>

        <div className={`w-[600px] ${innerBodyColor} shadow-sm rounded-[15px] p-[20px] mt-3`}>
            <div className="">
              <div className="">
                <p className="text-[16px] font-[500] font-sans">
                  Category Name*
                </p>
                <input
                  className={` ${innerBodyColor} mt-2 w-full px-[6px] py-[11px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  value=""
                  placeholder="Category Name"
                />
              </div>
              <div className="mt-3">
                      <Button variant="contained" color="primary">Add Category</Button>
                    </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default Addcategory
