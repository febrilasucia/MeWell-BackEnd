import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loading from "../../images/loading2.gif";
import axios from "axios";

function Card() {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios(
      "https://636ccb0d91576e19e315574a.mockapi.io/blog?page=1&limit=6"
    ).then((res) => {
      setBlogs(res.data);
      setIsLoading(false);
    });
  }, []);

  const handleDetail = (id) => {
    navigation(`/blog/${id}`);
  };

  return (
    <div>
      {/* card blog */}
      <div className="flex flex-wrap justify-center">
        {isLoading ? (
          <img src={loading} alt="isLoading" className="h-40 sm:h-60 mx-auto" />
        ) : !blogs || blogs == "" ? (
          <div className="flex justify-center font-mono font-semibold text-[#295454]">
            <img src={Empty} alt="isLoading" className="h-60 sm:h-80 mx-auto" />
            <div className="text-xl text-center">404 Not Found </div>
          </div>
        ) : (
          blogs.map((item, index) => (
            <div key={index} onClick={() => clickBlog(item)}>
              <div>
                <div className="m-5 w-[200px] sm:w-[300px] bg-white hover:bg-textSecondary border border-gray-100 rounded-xl shadow-md text-textSecondary hover:text-white">
                  <img src={item.img} alt="sample img" className="rounded-xl" />
                  <div className="px-5 py-3">
                    <h5 className="mb-2 sm:text-xl font-bold tracking-tight">
                      {item.tittle}
                    </h5>
                    <p className="mb-3 text-sm font-normal text-gray-500 dark:text-gray-400 truncate">
                      {item.descContent}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between mx-4 mb-4 ">
                    <div className="blogItem-author flex flex-wrap items-center">
                      <div className="blogItem-authorPhoto">
                        <img
                          src={item.img}
                          alt="avatar"
                          className="mx-2 w-[40px] h-[40px] rounded-[50%] object-cover ml-2"
                        />
                      </div>
                      <div className="blogItem-authorDesc">
                        <h6 className="text-xs font-semibold text-black">
                          {item.author}
                        </h6>
                        <p className="text-xs font-semibold text-[#a9a9a9]">
                          {item.releaseDate}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDetail(item.id)}
                      className="mx-2 w-5 h-4"
                    >
                      ➝
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Card;
