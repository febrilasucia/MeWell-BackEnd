import React from 'react';

function Comment() {
  return (
    <div className="my-20">
      <section className="h-[300px]">
        <p className="text-2xl text-textSecondary sm:text-4xl font-bold text-center">
          Apa kata mereka?
        </p>
        <p className="text-center text-gray-400 text-[12px] sm:text-lg">
          Setelah menggunakan layanan website ini
        </p>
        <section className="m-10 flex flex-wrap justify-center gap-2">
          <div className="w-[200px] sm:w-[300px] h-[110px] sm:h-[210px] border-black rounded-md shadow-md">
            <div className="mx-2 sm:m-5  border-gray-500 rounded-lg shadow-gray-300 gap-1 flex flex-wrap items-center">
              <img
                src="/images/user.png"
                alt=""
                className="sm:w-7 lg:w-10 sm:h-7 lg:h-10 rounded-xl sm:rounded-full h-5 border-black bg-yellow"
              />
              <p className="text-[12px] sm:text-[16px] lg:text-lg">
                @febrilasucia
              </p>
            </div>
            <div className="mx-3 sm:mx-5 sm:my-5 ">
              <h1 className="text-xs sm:text-sm text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates tenetur cumque odio fugiat non, libero magni
              </h1>
            </div>
          </div>
          <div className="w-[200px] sm:w-[300px] h-[110px] sm:h-[210px] border-black rounded-md shadow-md">
            <div className="mx-2 sm:m-5  border-gray-500 rounded-lg shadow-gray-300 gap-1 flex flex-wrap items-center">
              <img
                src="/images/user.png"
                alt=""
                className="sm:w-7 lg:w-10 sm:h-7 lg:h-10 rounded-xl sm:rounded-full h-5 border-black bg-yellow"
              />
              <p className="text-[12px] sm:text-[16px] lg:text-lg">
                @febrilasucia
              </p>
            </div>
            <div className="mx-3 sm:mx-5 sm:my-5 ">
              <h1 className="text-xs sm:text-sm text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates tenetur cumque odio fugiat non, libero magni
              </h1>
            </div>
          </div>
          <div className="w-[200px] sm:w-[300px] h-[110px] sm:h-[210px] border-black rounded-md shadow-md">
            <div className="mx-2 sm:m-5  border-gray-500 rounded-lg shadow-gray-300 gap-1 flex flex-wrap items-center">
              <img
                src="/images/user.png"
                alt=""
                className="sm:w-7 lg:w-10 sm:h-7 lg:h-10 rounded-xl sm:rounded-full h-5 border-black bg-yellow"
              />
              <p className="text-[12px] sm:text-[16px] lg:text-lg">
                @febrilasucia
              </p>
            </div>
            <div className="mx-3 sm:mx-5 sm:my-5 ">
              <h1 className="text-xs sm:text-sm text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates tenetur cumque odio fugiat non, libero magni
              </h1>
            </div>
          </div>
          <div className="w-[200px] sm:w-[300px] h-[110px] sm:h-[210px] border-black rounded-md shadow-md">
            <div className="mx-2 sm:m-5  border-gray-500 rounded-lg shadow-gray-300 gap-1 flex flex-wrap items-center">
              <img
                src="/images/user.png"
                alt=""
                className="sm:w-7 lg:w-10 sm:h-7 lg:h-10 rounded-xl sm:rounded-full h-5 border-black bg-yellow"
              />
              <p className="text-[12px] sm:text-[16px] lg:text-lg">
                @febrilasucia
              </p>
            </div>
            <div className="mx-3 sm:mx-5 sm:my-5 ">
              <h1 className="text-xs sm:text-sm text-gray-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates tenetur cumque odio fugiat non, libero magni
              </h1>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Comment;
