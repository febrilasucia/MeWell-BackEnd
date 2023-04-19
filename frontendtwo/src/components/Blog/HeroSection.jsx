import React from 'react';

function HeroSection() {
  return (
    <div>
      <section className="h-[500px] sm:h-[550px] lg:h-[500px] w-full bg-bgPrimary  mx-auto">
        <div className="h-[500px] sm:h-[500px] lg:h-[500px] lg:flex lg:flex-wrap items-center justify-center gap-2">
          <div className="flex justify-center ">
            <img
              src="/images/buku.png"
              alt=""
              className="h-[230px] sm:mx-2 sm:-mb-20 lg:-mb-0 sm:h-[400px] "
            />
          </div>
          <div className="justify-center text-center sm:text-center lg:text-left">
            <span className="font-bold text-5xl sm:text-[64px] lg:text-[64px]  text-white">
              WAKTUNYA
            </span>
            <span className="font-bold text-5xl sm:text-[64px] lg:text-[64px] text-[#CFCD06]">
              MEMBACA
            </span>
            <br />
            <span className="text-center text-white mt-2">
              Kumpulan bacaan kamu ada disini <br />
              Coba scroll kebawah, mungkin ada cerita untuk perasaan kamu hari
              ini.
            </span>
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default HeroSection;
