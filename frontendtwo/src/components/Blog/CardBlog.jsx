import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBlog } from '../../features/blogslice';
import { useDispatch } from 'react-redux';

function CardBlog() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState('');
  const [blogs, setBlogs] = useState([]);

  const searchBlog = (e) => {
    e.preventDefault();
    axios(
      `https://636ccb0d91576e19e315574a.mockapi.io/blog?tittle=${searching}`
    ).then((res) => {
      setBlogs(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const response = getBlogs();
    console.log(response);
    // axios(
    //   "https://636ccb0d91576e19e315574a.mockapi.io/blog?page=1&limit=6"
    // ).then((res) => {
    //   setBlogs(res.data);
    //   setIsLoading(false);
    // });
  }, []);

  const getBlogs = () => {
    dispatch(getBlog());
  };

  const clickBlog = (item) => {
    console.log('berhasil klik');
    console.log(item);
  };

  const handleDetail = (id) => {
    navigation(`/blog/${id}`);
  };
  return (
    <div>
      <section className="p-12 sm:p-auto  bg-white">
        <header className="w-full mx-auto text-center">
          <h1 className="font-bold text-2xl sm:text-4xl text-center text-[#006969]">
            Cari
          </h1>
          <br />
          <p className="text-gray-500">Ayo ketik sesuatu, lalu enter</p>
        </header>

        <div className="mt-12 flex justify-center w-full">
          <div>
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <form className="flex" type="submit" onSubmit={searchBlog}>
                <input
                  className="form-control form-control relative flex-auto min-w-0 block w-[250px] sm:w-[600px] lg:w-[800px] px-3 py-1.5 text-xs sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-200 rounded transition ease-in-out m-0 focus:text-black focus:bg-white focus:border-textSecondary focus:outline-none"
                  type="text"
                  placeholder="Cari disini..."
                  name="search"
                  aria-label="Search"
                  value={searching}
                  onChange={(e) => setSearching(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-center">
        {isLoading ? (
          <img src='/images/loading2.gif' alt="isLoading" className="h-40 sm:h-60 mx-auto" />
        ) : !blogs || blogs == '' ? (
          <div className="flex justify-center font-mono font-semibold text-[#295454]">
            <img src='/images/empty.gif' alt="isLoading" className="h-60 sm:h-80 mx-auto" />
          </div>
        ) : (
          blogs.map((item, index) => (
            <div key={index} onClick={() => clickBlog(item)}>
              <div key={index} onClick={() => clickBlog(item)}>
                <div>
                  <div className="m-5 w-[200px] sm:w-[300px] bg-white hover:bg-textSecondary border border-gray-100 rounded-xl shadow-md text-textSecondary hover:text-white">
                    <img
                      src={item.img}
                      alt="sample img"
                      className="rounded-xl"
                    />
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CardBlog;
