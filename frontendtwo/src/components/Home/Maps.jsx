import React from "react";

function Maps() {
  return (
    <div>
      {/* JUDUL CARD */}
      <section className="h-[400px] bg-bgPrimary">
        <h1 className="mt-5 text-center text-textWhite text-3xl font-semibold">
          Lokasi Klinik <br /> MS Wellbeing Center Terdekat
        </h1>
        <div className=" bg-white border border-gray-50 rounded-xl shadow-md">
          <div className="flex">
            <div className="m-3">
              <img src="" alt="" />
            </div>
            <div className="mx-5 my-3">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-textPrimary truncate"></h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 truncate-overflow"></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Maps;
