import React from "react";
import { FaFacebook, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  return (
    <div className="bg-black text-white ">
      <div className="container mx-auto py-10 px-10">
        <div className="flex justify-between w-[1120px]">
          <div className="footer-div-1">
            <h3 className="text-2xl">Download Our App</h3>
            <h1 className="text-4xl font-bold">M<span className="text-yellow-500">oo</span>vie</h1>

            {/* <button className="bg-gray-500 hover:bg-yellow-600 text-white px-2 rounded-lg">DownLoad On The <br /><h1>App Store</h1></button>
           
            <button className="bg-gray-500 hover:bg-yellow-600 text-white px-4 ml-5 rounded-xl">Get It On <br /><h1>Google Play</h1></button> */}

          </div>

          <div className="footer-div-3">
            <h3 className="text-2xl">Navigation</h3>
            <p>Home</p>
            <p>My List</p>
            <p>About Us</p>
          </div>

          <div className="footer-div-3">
            <h3 className="text-2xl">Legal</h3>
            <p>General Terms</p>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>

          <div className="footer-div-3">
            <h3 className="text-2xl">Contact Us:</h3>
            <p>Email: support@moovie.com</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Follow Us:</p>
            <div className="flex">
              <a href="#" className="mr-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="mr-2">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-div-3 gap-10">
  <h3 className="text-2xl">Share Website Via:</h3>
  <p className="flex items-center mt-3"> <FaFacebook size={24} className="mr-2" /> Facebook </p>
  <p className="flex items-center"> <FaInstagram size={24} className="mr-2" /> Instagram </p>
</div>
        </div>
        <br />
       
        <hr className="my-6" />

        <p className="text-center text-gray-500 text-sm">
          &copy; 2023 Moovie. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;