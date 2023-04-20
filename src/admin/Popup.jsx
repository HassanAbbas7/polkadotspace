import React from "react";

const Popup = ({
  setVisiblePopup,
  setNameValue,
  setURLValue,
  nameValue,
  urlValue,
  submitWebsiteRequest,
}) => {
  return (
    <div className="admin_popup rounded-[30px] px-10 py-14 w-full">
      <div
        className="absolute right-8 top-8 border-2 border-black w-[40px] cursor-pointer"
        onClick={() => {
          setVisiblePopup(false);
        }}
      >
        X
      </div>
      <h2 className="text-[40px] font-[700]">Add Website</h2>
      <form onSubmit={submitWebsiteRequest} >
        <input
          type="text"
          required
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
          required
          className="w-full border-2 rounded-[46px] py-4 my-6 indent-6 font-[400] text-[12px] md:text-[20px]"
          placeholder="Website URL"
          name="url"
          value={urlValue}
          onChange={(e) => setURLValue(e.target.value)}
        />
        <button
          type="submit"
          className="main_btn px-[50px] text-[30px] bg-pink-600 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Popup;
