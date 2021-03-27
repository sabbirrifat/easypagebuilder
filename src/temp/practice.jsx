import React, { useEffect } from 'react';
import axios from 'axios'
const Practice = () => {
    useEffect(()=>{

// Request API.
axios
  .post('http://localhost:1337/auth/local', {
    identifier: 'user@strapi.io',
    password: 'strapiPassword',
  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    localStorage.setItem('auth_token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    },[])
    return (
        <div>
            hello
        </div>
    );
};

export default Practice;