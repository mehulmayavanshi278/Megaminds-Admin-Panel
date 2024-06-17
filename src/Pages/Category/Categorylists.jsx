import React , {useState , useEffect} from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


function Categorylists({innerBodyColor , bodyColor}) {
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
      <div className="w-[900px]">
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

        <div className={ `  ${innerBodyColor} p-[25px] w-auto mt-4  shadow-sm rounded-[15px] `}>
          <div className="">
            <div className="flex flex-row justify-between items-center">
              <div className=" w-[400px] relative flex flex-row items-center">
                <input
                  className={` ${bodyColor} w-full px-[10px] py-[10px] border-solid outline-none rounded-[10px] placeholder:px-[10px] border border-1px`}
                  type="text"
                  value=""
                  placeholder="search here..."
                />
                <div className="absolute top-1/2  right-0 -translate-x-1/2 -translate-y-1/2">
                  <SearchIcon />
                </div>
              </div>
              <div className="">
                <Button variant="contained" color="primary">
                  Add Product
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[1px] my-[20px]  bg-[#cfcaca]"></div>
          <div className="grid grid-cols-1 ">
            <div className="col-span-1 overflow-x-scroll">
            <table className="w-[900px] overflow-x-scroll">
      <thead>
        <tr className="">
          <th className="text-start text-[14px] px-4">Category Name</th>
          <th className="text-start text-[14px] px-4">Created At</th>
          <th className="text-start text-[14px] px-4">Action</th>
        </tr>
        <div className="py-3"></div>
      </thead>
      <tbody>
        {Array.from({length:8}, () => (
          <tr  className="hover:bg-[#f1f1f4] cursor-pointer">
       

            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {"Antidioxidents"}
                </p>
              </div>
            </td>

            <td className="py-2 px-4">
              <div className="mt-0 p-0 flex flex-col justify-center">
                <p className="align-middle text-start text-[14px] font-[400] text-[#5d5959]">
                  {"25 january 2023"}
                </p>
              </div>
            </td>

            <td className="py-2 px-4">
              <div className="">
                  <div className="flex flex-row justify-start gap-4 ">
                    <EditIcon style={{color:"orange"}} />
                    <DeleteForeverIcon style={{color:"red"}}/>
                  </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Categorylists
