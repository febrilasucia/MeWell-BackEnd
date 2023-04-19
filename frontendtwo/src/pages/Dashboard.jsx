import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Comment from '../components/Home/Comment';
import HeroSection from '../components/Home/HeroSection';
import HeroSection2 from '../components/Home/HeroSection2';
import HeroSection3 from '../components/Home/HeroSection3';
import Navbar from '../components/Navbar';
import { getMe } from '../features/authSlice';
import Layout from './Layout';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    me();
  }, [dispatch]);
  const me = () => {
    dispatch(getMe());
  };

  useEffect(() => {
    if (message && isError) {
      alert(message);
      navigate('/');
    }
  }, [isError]);
  return (
    <Layout>
      <HeroSection />
      <HeroSection3 />

      <HeroSection2 />
      <Comment />
    </Layout>
  );
};

export default Dashboard;
