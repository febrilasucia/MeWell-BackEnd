import React from 'react'

function HeroSection() {
  return (
    <div>
      <section className="h-[350px] sm:h-[550px] lg:h-[500px] w-full text-bgPrimary  mx-auto">
        <div className="h-[500px] sm:h-[500px] lg:h-[500px] lg:flex-wrap items-center justify-center gap-2">
          <div className="flex justify-center ">
            <img
              src='/images/team.png'
              alt=""
              className="h-[230px] sm:mx-2 sm:-mb-20 lg:-mb-20 sm:h-[400px] "
            />
          </div>
          <div className="justify-center text-center sm:text-center">
            <span className="font-bold text-5xl sm:text-[64px] lg:text-[64px]  text-textSecondary">
              FEBE'3
            </span>
            <span className="font-bold text-5xl sm:text-[64px] lg:text-[64px] text-yellow">
              MEMBERS
            </span>
            <br />
            <span className="text-center text-textSecondary mt-2">
              Kami adalah manusia mata panda yang ada dibalik layar.<br />
            Let's check it !!
            </span>
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}

export default HeroSection