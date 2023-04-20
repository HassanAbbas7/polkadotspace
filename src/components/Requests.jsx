import React from "react";

const Requests = ({
  submitWebsiteRequest,
  openRequest,
  setOpenRequest,
  setNameValue,
  setURLValue,
  nameValue,
  urlValue,
}) => {
  return (
    <div className="app_requests bg-white rounded-[30px] w-[800px] p-6 text-black">
      <div
        className="absolute right-8 top-8 w-[40px] cursor-pointer text-black text-center"
        onClick={() => {
          setOpenRequest(false);
        }}
      >
        X
      </div>
      <h2 className="text-[40px] font-[700] text-center">Make a request</h2>
      <form onSubmit={submitWebsiteRequest} >
        <input
          type="text"
          className="w-full border-2 rounded-[46px] py-4 my-6 indent-6 font-[400] text-[12px] md:text-[20px]"
          placeholder="Website Name"
          name="name"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
        <input
          type="url"
          className="w-full border-2 rounded-[46px] py-4 my-6 indent-6 font-[400] text-[12px] md:text-[20px]"
          placeholder="Website URL"
          name="url"
          value={urlValue}
          onChange={(e) => setURLValue(e.target.value)}
        />
        <button className="main_btn px-[50px] text-[30px] block mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Requests;
