import React, { useState, useEffect } from "react";
import { BASE_URL, GET_ALL_USER_URL } from '../commons/constant';
import AdminPanel from "./AdminPanel";
import PostsPagination from "../components/PostsPagination";

import person from "../assets/images/person.jpg";
import { getToken } from "../auth";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const getAllUser = async (page, size) => {
    fetch(`${GET_ALL_USER_URL}?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
    })
      .then((res) => {
        console.log(`users res: `, res);
        return res.json()
      })
      .then(data => {
        console.log(`users data: `, data);
        setUsers(data?.users)
        setTotalCount(data?.total_elements ? data.total_elements : 0)
      })
      .catch((err) => {
        console.log(`users err: `, err);
      })
  }

  useEffect(() => {
    getAllUser(page, size);
  }, [page, size]);

  console.log("users: ", users);
  console.log("user page total: ", totalCount);

  return (
    <div className="admin_users">
      <h1 className="text-[70px] font-[700] text-center mb-10">Users</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-[332px]">
          <AdminPanel />
        </div>
        {
          users.length > 0 ?
            <div className="admin_users-wrapper h-[1050px] w-[974px] p-6 rounded-[50px]">
              {
                users.map((user, i) => {
                  return (
                    <div
                      className="admin_users-wrapper_box flex items-center mt-[80px]"
                      key={i}
                    >
                      <div className="w-1/6">
                        <img
                          src={`${BASE_URL}${user?.profile?.profile_image}`}
                          alt="Person"
                          className="w-[6.25rem] rounded-full"
                        />
                      </div>
                      <div className="w-2/6 text-[20px] lg:text-[25px] ml-4">
                        <h3>{user.first_name}</h3>
                        <h3>{user.last_name}</h3>
                      </div>
                      <div className="w-3/6 text-[20px] lg:text-[25px] ml-4">
                        <h3>{user.email}</h3>
                      </div>
                    </div>
                  );
                })
              }
              <div className="-mt-40">
                <PostsPagination type="users" totalCount={totalCount} setPage={setPage} setSize={setSize} />
              </div>
            </div>
            :
            <h2> No users found!</h2>
        }

      </div>
    </div>
  );
};

export default Users;
