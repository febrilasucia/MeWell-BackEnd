import React from 'react';

function HeroSection() {
  return (
    <div>
      <section className="h-[500px] sm:h-[550px] lg:h-[500px] w-full text-bgPrimary  mx-auto bg-bgOther">
        <div className="h-[500px] sm:h-[500px] lg:h-[500px] lg:flex lg:flex-wrap items-center justify-center gap-2">
          <div className="flex justify-center ">
            <img
              src="/images/menonton.png"
              alt=""
              className="h-[230px] sm:mx-2 sm:-mb-20 lg:-mb-0 sm:h-[300px] "
            />
          </div>
          <div className="justify-center text-center sm:text-center lg:text-left">
            <span className="font-bold text-5xl sm:text-[64px] lg:text-[64px]  text-textSecondary">
              WAKTUNYA
            </span>
            <span className="font-bold text-5xl sm:text-[64px] lg:text-[64px] text-red">
              MENONTON
            </span>
            <br />
            <span className="text-center text-textSecondary mt-2">
              Kumpulan video kamu ada disini <br />
              Coba scroll kebawah, mungkin ada bisa kamu dengar hari ini. ini.
            </span>
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default HeroSection;
