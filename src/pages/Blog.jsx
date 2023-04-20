import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogSidebar from "../components/BlogSidebar";
import BlogPost from "../components/BlogPost";
import PostsPagination from "../components/PostsPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { GET_ALL_BLOG_URL, GET_ALL_ARTICLE_URL } from "../commons/constant";

const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const [articles, setArticles] = useState([]);

  const getAllBlogs = async (page, size) => {
    fetch(`${GET_ALL_BLOG_URL}?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data?.blogs);
        setTotalCount(data?.total_elements ? data.total_elements : 0);
      })
      .catch((err) => {
        toast.error("Can't find blogs");
      });
  };

  const getAllAritcles = async () => {
    fetch(`${GET_ALL_ARTICLE_URL}`, {
      method: "GET",
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticles(data?.articles);
      })
      .catch((err) => {
        toast.error("Can't find related articles");
      });
  };

  useEffect(() => {
    getAllBlogs(page, size);
  }, [page, size]);

  useEffect(() => {
    getAllAritcles();
  }, []);

  console.log(`blogs: `, blogs);
  console.log(`articles: `, articles);

  return (
    <div className="app_blog">
      <h1 className="w-6/6 mb-16 text-center text-[26px] md:text-[70px] font-[800]">
        RPC
      </h1>
      <div className="flex">
        <div className="w-6/6 lg:w-4/6 lg:pr-20">
          {articles?.map((article, index) => (
            <div key={index}>
              <BlogPost article={article} />
            </div>
          ))}
          {/* <BlogPost /> */}
        </div>
        <div
          className={`w-2/6 border-l-2 pl-8 h-[${
            document.querySelector(".app_blog") &&
            document.querySelector(".app_blog").offsetHeight
          }px] hidden lg:block`}
        >
          <div className="mb-4">
            <a href="/pages/addarticle" className="text-blue-400">
              Add new article <span>{editIcon}</span>
            </a>
          </div>
          <h2 className="text-[16px] font-[600] mb-4">
            More From Polkadotspace
          </h2>
          {articles?.map((article, index) => (
            <div key={index}>
              <BlogSidebar article={article} />
            </div>
          ))}
          {/* <BlogSidebar />
          <BlogSidebar />
          <BlogSidebar />
          <BlogSidebar /> */}

          <div className="app_blogsidebar-topics mt-[25px] lg:mt-[58px]">
            <h3 className="text-[15px]">Recommended topics</h3>
            <div className="app_blog-box_tags flex flex-wrap">
              {["Programing", "UI/UX", "BTC", "Polkadot"].map((topic, i) => {
                return (
                  <span
                    className="my-2 mr-2 py-[4px] md:py-[9px] px-[8px] md:px-[30px] text-[10px] md:text-[15px] cursor-pointer bg-[#E6007A] rounded-[34px] text-white"
                    key={i}
                  >
                    {topic}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        {blogs.length > 0 && (
          <PostsPagination
            type="Blogs"
            totalCount={totalCount}
            setPage={setPage}
            setSize={setSize}
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
