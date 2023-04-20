import React from "react";

const ReplyBox = ({ areaValue, setAreaValue, onFormSubmit }) => {
  return (
    <form
      className="app_comments-reply_box shadow-md p-6 rounded"
      onSubmit={onFormSubmit}
    >
      <h2 className="text-[18px] mb-2">Your Opinion</h2>
      <textarea
        className="resize-none px-4 py-2 border-2 h-32 w-full text-[12px]"
        placeholder="Type your thoughts..."
        onChange={(e) => setAreaValue(e.target.value)}
        value={areaValue}
      ></textarea>
      <div className="app_comments-reply_box-actions flex justify-between">
        <button
          className="btn text-[14px] px-6 py-1"
          onClick={() => setAreaValue("")}
        >
          Cancel
        </button>
        <button
          className={`main_btn text-[14px] px-6 py-1 bg-red-500 ${
            areaValue.length > 0 ? "opacity-100" : "opacity-30"
          }`}
          type="submit"
        >
          Respond
        </button>
      </div>
    </form>
  );
};

export default ReplyBox;
