import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const adminLinksRef = useRef(null);
  const checkURL = () => {
    if (adminLinksRef.current) {
      const links = Array.from(adminLinksRef.current.children);
      links.forEach((link) => {
        if (window.location.href === link.firstElementChild.href) {
          link.classList.add("current");
        }
      });
    }
  };

  useEffect(() => {
    checkURL();
  });

  return (
    <div className="admin_users-panel rounded-[50px] h-[1050px] mb-10 px-[15px] py-[50px] mr-[49px]">
      <h2 className="text-[31px] font-[700] text-center">Admin Panel</h2>
      <ul
        className="admin_users-list md:mt-[55px] flex items-left justify-evenly flex-row md:flex-col px-[35px] "
        ref={adminLinksRef}
      >
        <li>
          <Link to="/admin/users" className="text-[30px]">
            Users
          </Link>
        </li>
        <li className="my-[35px]">
          <Link to="/admin/websites" className="text-[30px]">
            Websites
          </Link>
        </li>
        <li>
          <Link to="/admin/states" className="text-[30px]">
            States
          </Link>
        </li>
      </ul>
      <div className="md:mt-[59px] text-center">
        <Link to="/" className="main_btn px-[19px] text-[16px]">
          Back to the website
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
