import React from 'react';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
import Form from '../Form/Form';

const MainScreen = () => {
  const user = useSelector((state) => state.auth);
  return user && user.isLoggedIn ? <Form /> : <Login />;
};

export default MainScreen;
