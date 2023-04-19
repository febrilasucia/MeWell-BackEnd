import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate('/homecomp');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    console.log(message);
  }, [message]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  // const Auth = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let response = await axios.post(
  //       'https://finalproject-be-production.up.railway.app/auth/login',
  //       {
  //         email,
  //         password,
  //       },
  //       { withCredentials: true }
  //     );
  //     const decode = await axios.post(
  //       'https://finalproject-be-production.up.railway.app/auth/me',
  //       { token: response.data.token }
  //     );
  //     dispatch(addMe(decode));
  //     dispatch(addToken(response.data.token));
  //     navigate('/homecomp');
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response) {
  //       setMessage(error.response.data.message);
  //     }
  //   }
  // };
  return (
    <div>
      <div className="mx-auto pt-24 pb-32 self-center">
        <div className="container flex mx-auto justify-items-center items-center py-1 px-4 sm:py-4 sm:px-16 md:py-8 md:px-32 bg-[#01A29D] rounded-sm shadow-lg lg:w-[1080px]">
          <div className="w-full">
            <div className="flex">
              <div className="w-full lg:w-3/4 mt-12 mb-12 sm:mb-24 mx-4 bg-[#008783] px-6 py-2 sm:px-12 sm:py-4 rounded-xl">
                <form onSubmit={Auth}>
                  <h1 className="text-4xl font-bold text-[#E6E6E6] text-center mb-2">
                    Form Masuk
                  </h1>
                  <div className="flex justify-center">
                    <img
                      src="/images/MentalHack.png"
                      alt="Logo"
                      className="mb-8"
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="text-lg font-semibold block text-[#E6E6E6]"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    className="text-lg px-2 py-1 rounded-xl w-full"
                  />
                  <label
                    htmlFor="password"
                    className="mt-4 text-lg font-semibold block text-[#E6E6E6]"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    className="text-lg px-2 py-1 rounded-xl w-full mb-4"
                  />
                  <h1 className="text-[#E6E6E6]">
                    Belum memiliki akun?
                    <Link to={'/register'} className="font-semibold">
                      {' '}
                      Daftar disini.
                    </Link>
                  </h1>
                  <div className=" mt-12 mb-8 flex justify-end w-full">
                    <button
                      type="submit"
                      className="block py-2 px-6 bg-[#006969] rounded-full w-full text-lg font-bold text-[#E6E6E6]"
                    >
                      Masuk
                    </button>
                  </div>
                </form>
              </div>
              <div className="hidden lg:w-2/4 mx-4 lg:flex justify-center items-center">
                <img src="/images/Dokter.png" alt="HeroImage" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample gambar"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {message ? (
                <div
                  className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                  role="alert"
                >
                  {message}
                </div>
              ) : (
                ''
              )}
              <form onSubmit={Auth}>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href="/register"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */
}
