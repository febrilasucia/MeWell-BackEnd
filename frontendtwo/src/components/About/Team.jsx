import React from 'react';
import { BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';

function Team() {
  return (
    <div>
      <div className="mb-10 h-[300px] sm:h-[350px] bg-bgPrimary">
        <div className="flex items-center gap-3 sm:gap-5 sm:justify-between sm:mx-20 h-[300px] sm:h-[350px]">
          <img src="/images/3.png" alt="" className="h-[200px] sm:h-[300px]" />
          <div className="">
            <p className="text-white text-2xl sm:text-4xl font-semibold">
              Chandra
            </p>
            <p className="text-white">20 tahun</p>
            <p className="text-white">Backend Web Developer</p>
            <p className="text-white italic text-[12px] sm:text-[14px]">
              "Hidup adalah pertanyaan dan bagaimana kita menjalaninya adalah
              jawaban"
            </p>
          </div>
          <div className="text-2xl text-white items-center">
            <BsGithub className="m-2" />
            <BsInstagram className="m-2" />
            <BsLinkedin className="m-2" />
          </div>
        </div>
      </div>

      <div className="sm:mb-10 h-[250px] sm:h-[350px] text-textSecondary">
        <div className="flex items-center gap-3 sm:gap-5 sm:justify-between mx-5 sm:mx-20">
          <div className="text-2xl items-center">
            <BsGithub className="m-2" />
            <BsInstagram className="m-2" />
            <BsLinkedin className="m-2" />
          </div>
          <div className="text-right">
            <p className=" text-2xl sm:text-4xl font-semibold">Zaky</p>
            <p>21 tahun</p>
            <p>Frontend Web Developer</p>
            <p className=" italic text-[12px] sm:text-[14px]">
              "Jadikanlah kritikan orang lain sebagai pembangun mental dan
              semangat untuk menjadi lebih baik lagi karena hidup kita tidak
              bergantung pada perkataan orang lain, hidup kita bergantung pada
              pola pikir mental dan ikhtiar kita sendiri."
            </p>
          </div>
          <img src="/images/8.png" alt="" className="h-[200px] sm:h-[300px]" />
        </div>
      </div>

      <div className="mb-10 h-[300px] sm:h-[350px] bg-bgPrimary">
        <div className="flex items-center gap-3 sm:gap-5 sm:justify-between sm:mx-20 h-[300px] sm:h-[350px]">
          <img src='/images/5.png' alt="" className="h-[200px] sm:h-[300px]" />
          <div className="">
            <p className="text-white text-2xl sm:text-4xl font-semibold">
              Sofi
            </p>
            <p className="text-white">20 tahun</p>
            <p className="text-white">Backend Web Developer</p>
            <p className="text-white italic text-[12px] sm:text-[14px]">
              "Kegagalan juga menyenangkan, hiduplah dengan kepercayaan bahwa
              cobaan itu berguna untuk menempa diri sendiri"
            </p>
          </div>
          <div className="text-2xl text-white items-center">
            <BsGithub className="m-2" />
            <BsInstagram className="m-2" />
            <BsLinkedin className="m-2" />
          </div>
        </div>
      </div>

      <div className="sm:mb-10 h-[250px] sm:h-[350px] text-textSecondary">
        <div className="flex items-center gap-3 sm:gap-5 sm:justify-between mx-5 sm:mx-20">
          <div className="text-2xl items-center">
            <BsGithub className="m-2" />
            <BsInstagram className="m-2" />
            <BsLinkedin className="m-2" />
          </div>
          <div className="text-right">
            <p className=" text-2xl sm:text-4xl font-semibold">Thobie</p>
            <p>20 tahun</p>
            <p>Frontend Web Developer</p>
            <p className=" italic text-[12px] sm:text-[14px]">
              "ngeluh oke, nyerah jangan"
            </p>
          </div>
          <img src="/images/4.png" alt="" className="h-[200px] sm:h-[300px]" />
        </div>
      </div>

      <div className="mb-10 h-[300px] sm:h-[350px] bg-bgPrimary">
        <div className="flex items-center gap-3 sm:gap-5 sm:justify-between sm:mx-20 h-[300px] sm:h-[350px]">
          <img src="/images/7.png" alt="" className="h-[200px] sm:h-[300px]" />
          <div className="">
            <p className="text-white text-2xl sm:text-4xl font-semibold">Dwi</p>
            <p className="text-white">20 tahun</p>
            <p className="text-white">Backend Web Developer</p>
            <p className="text-white italic text-[12px] sm:text-[14px]">
              "Kegagalan juga menyenangkan, hiduplah dengan kepercayaan bahwa
              cobaan itu berguna untuk menempa diri sendiri"
            </p>
          </div>
          <div className="text-2xl text-white items-center">
            <BsGithub className="m-2" />
            <BsInstagram className="m-2" />
            <BsLinkedin className="m-2" />
          </div>
        </div>
      </div>

      <div className="mb-10 h-[250px] sm:h-[350px] text-textSecondary">
        <div className="flex items-center gap-3 sm:gap-5 sm:justify-between mx-5 sm:mx-20">
          <div className="text-2xl items-center">
            <BsGithub className="m-2" />
            <BsInstagram className="m-2" />
            <BsLinkedin className="m-2" />
          </div>
          <div className="text-right">
            <p className=" text-2xl sm:text-4xl font-semibold">Suca</p>
            <p>20 tahun</p>
            <p>Frontend Web Developer</p>
            <p className=" italic text-[12px] sm:text-[14px]">
              "tidak dapat berbicara, kirim duit saja"
            </p>
          </div>
          <img src='/images/6.png' alt="" className="h-[200px] sm:h-[300px]" />
        </div>
      </div>
    </div>
  );
}

export default Team;
