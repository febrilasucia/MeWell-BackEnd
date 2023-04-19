import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const HomeComp = () => {
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
    if (user && user.role == 'admin') {
      navigate('/admin/dashboard');
    }
    
    if (user && user.role == 'user') {
      navigate('/dashboard');
    }
  }, [user]);
  useEffect(() => {
    if (message && isError) {
      alert(message)
      navigate('/')
    }
  }, [isError])
  

};

export default HomeComp;
