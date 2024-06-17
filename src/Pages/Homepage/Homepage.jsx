import React, { useEffect, useState } from "react";

import SettingsIcon from "@mui/icons-material/Settings";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CollectionsIcon from "@mui/icons-material/Collections";
import HelpIcon from "@mui/icons-material/Help";
import SecurityIcon from "@mui/icons-material/Security";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import Homepage01 from "../../Components/Homepage/Homepage01";
import Sidebar from "../../Partials/Sidebar";
import Navbar from "../../Partials/Navbar";
import TokenHelper from "../../Helpers/TokenHelper";

export const tabIcons = [
  ShoppingCartIcon,
  AccessibilityIcon,
  AcUnitIcon,
  PersonAddAltIcon,
  NoteAddIcon,
  SettingsIcon,
  HelpIcon,
  SecurityIcon,
  ChatBubbleOutlineIcon

];

export const tabsObject = {
  Dashboard: [],
  Ecommerce: ["Add Products", "Product List"],
  Category: ["Add Category", "Category List"],
  // Attributes: ["Add Attribute", "All Attributes"],
  Order: ["Order List"],
  User: ["Add New User", "All User"],
  Gallery: [],
  Setting: [],
  "Help Center": [],
  "Privacy Policy": [],
  "chat":[]
};

export const theme = {
  light:'text-black bg-white',
  dark:'text-[#cbb9b9] bg-[#1E293B]',
  bg:{
    dark:"bg-[#1f1f35] text-[#cbb9b9]",
    // light:"bg-[#f1f1f4]"
    light:"bg-[#ecf0f4]"
  }
} 

export const darkTheme = "text-[#cbb9b9] bg-[#1E293B]";
export const darkBody = "bg-[#1f1f35] text-[#cbb9b9]"
export const lightTheme = "text-black bg-white";
export const lightBody = "bg-[#f1f1f4]"


console.log(Object.keys(tabsObject));

// const subTabs = [
//     "Add Products",
//     "Add Category",
//     "Add Attribute",
//     "Add New User"
//   ]

// const tabs = [
//   "Dashboard",
//   "Ecommerce",
//   "Category",
//   "Attributes",
//   "Order",
//   "User",
//   "Gallery",
//   "Setting",
//   "Help Center",
//   "Privacy Policy",
// ];

// const tabsss = {};

function Homepage({innerBodyColor , bodyColor , socket}) {

  useEffect(()=>{

  },[]);

  return (
    <>
      <Homepage01 innerBodyColor={innerBodyColor} bodyColor={bodyColor} socket={socket}/>
    </>
  );
}

export default Homepage;
