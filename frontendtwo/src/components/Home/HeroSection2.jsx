import React from 'react';

function HeroSection2() {
  return (
    <div>
      <section className="h-[270px] sm:h-[400px] text-white bg-bgPrimary border ">
        <div className="h-[270px] sm:h-[400px] flex items-center justify-center mx-5 sm:mx-20 gap-3">
          <img
            src="/images/grafik.gif"
            alt=""
            className="h-[150px] sm:h-[200px] lg:h-[300px]"
          />
          <div>
            <p className="text-xl sm:text-2xl lg:text-4xl font-bold ">
              Tau ga sih?
            </p>
            <div className="italic text-justify mt-3 text-xs sm:text-base lg:text-lg">
              Masalah kesehatan mental meningkat dua kali lipat selama pandemi.{' '}
              <br />
              Tanpa kamu sadari, kamu bisa jadi salah satunya.
              <br /> Yuk, bergabung bersama 25,000+ orang lainnya untuk belajar
              menjaga kesehatan mental bersama MentalHack. Website yang
              berisikan berita dan blog terbaru yang menjadi solusi terbaik
              untuk kamu, memahami diri dan solusi masalah hati lebih dalam.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection2;
