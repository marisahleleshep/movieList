import React, { useState } from "react";

const Navbar = () => {

  return (
    
    <div className=" py-7 bg-black">
     
     <div className=" ml-[60%] mt-[-17%] ">
              <ul className=" flex items-center gap-8 ml-60 ">
                <li className="nav-item">
                  <a className="nav-link text-white text-lg" href="">
                    Home
                  </a>
                </li>

                <li className="nav-item ml-10">
              <a className="nav-link text-white text-lg flex items-center whitespace-nowrap" href="">
               My List
               </a>
              </li>

                <li className="nav-item">
                  <button className="bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring focus:bg-yellow-300 text-lg ml-20 w-[70%] h-[3%] mt-[-2%]" type="button">
                    <a className="nav-link active text-black text-lg" href="/sign Up">
                      Sign Up
                    </a>
                  </button>
                </li>
              </ul>
              </div>
    </div>
  );
};

export default Navbar;