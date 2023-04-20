import React from "react";

import person from "../assets/images/person.jpg";

const RPC = () => {
  return (
    <div className="app_rpc bg-white">
      <h1 className="text-[70px] font-[700] text-center">RPC</h1>
      <div className="app_rpc-wrapper rounded-[20px] p-20 mt-[50px]">
        {[
          {
            image: person,
            name: "User Name",
            text: "Hello, how are you?",
          },
          {
            image: person,
            name: "User Name",
            text: "I am good at all,if you need to buy BTC,I can help you",
          },
          {
            image: person,
            name: "User Name",
            text: "Thanks,I will do by myself",
          },
          {
            image: person,
            name: "User Name",
            text: "I am good at all,if you need to buy BTC,I can help you",
          },
        ].map((chat, i) => {
          return (
            <div className="app_rpc-wrapper_box flex items-center mt-6">
              <div className="mr-[10px]">
                <img
                  className="rounded-full w-20"
                  src={chat.image}
                  alt="person"
                />
              </div>
              <div className="border-2 rounded-[50px] w-[360px] px-8 py-6 border-black">
                <h3 className="text-[15px] font-[300]">{chat.name}</h3>
                <h2 className="text-[20px] font-[400]">{chat.text}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RPC;
