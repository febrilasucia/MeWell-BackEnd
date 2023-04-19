import React, {useState} from 'react'
import Logo from "../../images/MentalHack.png"
import Hero from "../../images/Dokter.png"

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.prevenDefault();
  //   console.log(email);
  }

  return (
    <>
      <div className="mx-auto pt-24 pb-32 self-center">
        <div className="container flex mx-auto justify-items-center items-center py-1 px-4 sm:py-4 sm:px-16 md:py-8 md:px-32 bg-[#01A29D] rounded-sm shadow-lg lg:w-[1080px]">
            <div className="w-full">
                <div className="flex">
                    <div className="w-full lg:w-3/4 mt-12 mb-12 sm:mb-24 mx-4 bg-[#008783] px-6 py-2 sm:px-12 sm:py-4 rounded-xl">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-4xl font-bold text-[#E6E6E6] text-center mb-2">Form Masuk
                            </h1>
                            <div className="flex justify-center">
                                <img src={Logo} alt="Logo" className="mb-8" />
                            </div>
                            <label htmlFor="email" className="text-lg font-semibold block text-[#E6E6E6]">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@email.com" className="text-lg px-2 py-1 rounded-xl w-full" />
                            <label htmlFor="password" className="mt-4 text-lg font-semibold block text-[#E6E6E6]">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="********" className="text-lg px-2 py-1 rounded-xl w-full mb-4" />
                            <h1 className='text-[#E6E6E6]'>
                                Belum memiliki akun? 
                                <a href="/" className="font-semibold"> Daftar disini.</a>
                            </h1>
                            <div className=" mt-12 mb-8 flex justify-end w-full">
                                <button type="submit" className="block py-2 px-6 bg-[#006969] rounded-full w-full text-lg font-bold text-[#E6E6E6]">Masuk</button>
                            </div>
                        </form>
                    </div>
                    <div className="hidden lg:w-2/4 mx-4 lg:flex justify-center items-center">
                        <img src={Hero} alt="HeroImage" className="" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

// export default Login