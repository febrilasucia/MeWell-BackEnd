import React from "react";

function HeroSection() {
  return (
    <div>
      <section className="h-[500px] sm:h-[600px] lg:h-[500px] w-full bg-bgPrimary mx-auto">
        <div className="h-[500px] sm:h-[500px] lg:h-[500px] flex flex-wrap items-center justify-center">
          <div>
            <img
              src='/images/otak.gif'
              alt=""
              className="mt-5 h-[230px] mx-auto sm:mx-2 sm:mb-0 sm:h-[300px]"
            />
          </div>
          <div className="mt-3 sm:mt-22 lg:mt-24 justify-center text-center sm:text-center lg:text-left sm:-ml-10">
            <span className="font-bold text-5xl sm:text-[72px] text-white">
              MENTAL
            </span>
            <span className="font-bold text-5xl sm:text-[72px] text-[#CFCD06]">
              HACK
            </span>
            <br />
            <span className="text-center text-white mt-2">
              Situs pembobolan masalah hati kamu, dengan <br />
              memahami diri dan mencari solusi masalah hati lebih dalam
            </span>
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default HeroSection;
