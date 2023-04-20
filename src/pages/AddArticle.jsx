import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_ARTICLE_URL } from "../commons/constant";
import { getToken } from "../auth";
import { toast } from "react-toastify";

const AddArticle = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const areaRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const createArticle = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const article = e.target.detail.value;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("article", article);
    if (image !== null) {
      formData.append("image", image);
    }
    fetch(`${CREATE_ARTICLE_URL}`, {
      method: "POST",
      headers: {
        // "Accept": "application/json text/plain",
        // "Content-Type": "multipart/form-data; boundary=something",
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Successfully created article");
          navigate("/pages/blog");
          return res.json();
        } else if (res.status === 401) {
          toast.success("Unauthenticated request sent. Please login first");
        }
        return res;
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        toast.error("Can't create article. Something went wrong");
      });
  };

  return (
    <div className="app_addArticle bg-white md:bg-transparent">
      <h1 className="text-[30px] md:text-[70px] text-center mb-10">
        Add Article
      </h1>
      <div className="app_addArticle-form w-3/3 md:w-2/3 mx-auto">
        <form className="flex flex-col text-[20px]" onSubmit={createArticle}>
          <input
            type="text"
            name="title"
            required
            placeholder="Title"
            className="bg-transparent border-2 py-1 px-2"
          />
          <input
            type="file"
            name="image"
            className="mt-8 "
            onChange={(e) => setImage(e.target.files[0])}
          />
          <textarea
            className="my-8 app_addArticle-form_textarea resize-none bg-transparent border-2 h-[500px] py-1 px-2 w-full"
            placeholder="Your Story"
            name="detail"
            required
            onChange={(e) => setTextareaValue(e.target.value)}
            value={textareaValue}
            ref={areaRef}
          ></textarea>
          <button className="main_btn bg-pink-600 text-white" type="submit">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
