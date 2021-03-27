import React, { useEffect, useState } from 'react'

const Logo = () => {
    const [logoUrl, setLogoUrl] = useState('');
    
    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/logo`)
        .then((res) => res.json())
        .then((data) => setLogoUrl(data.Image[0].url));
    }, []);

    return (
        <div className="header-logo" style={{marginLeft: '20px'}}>
         
          <a href="/">
            <img class="logo-light" src={`${process.env.REACT_APP_BACKEND_URL}${logoUrl}`} alt="" /> 
          </a>
          
          
      </div>
    )
}



export default Logo
