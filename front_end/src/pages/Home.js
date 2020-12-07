import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { setUsername, setPassword } from '../redux/actions/userActions';
import NavigationHeader from '../components/NavigationHeader';

const Home = () => {
  return (
    <div className="Home">
      <h3>Home</h3>
      <NavigationHeader />
    </div>
  );
};

export default Home;
