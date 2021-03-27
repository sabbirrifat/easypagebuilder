import React, { useState } from 'react';
import './MyDomains.css'
import {Link} from 'react-router-dom'
import SearchBox from '../../ClientsServices/SearchBox/SearchBox'
import ServicesAndProducts from './ServicesAndProducts/ServicesAndProducts';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
const MyDomains = () => {
    const [searchfield,setSearchfield] = useState('');
    const translation = useSelector(state=>state.pages.translation)==='English'
    const setserachfiled = value=>{
        setSearchfield(value)
    }
    console.log(searchfield)
    return (
        <div className="mydomains">
            <Helmet>
                <title>my Domains</title>
            </Helmet>
            <div className='top-com'>
                <div className='title'><h1>{translation?'My Domains':'התחומים שלי'}</h1>
                <p style={{letterSpacing:'1px'}}>
                <Link to='/'>Portal Home</Link> /
                <Link to='/dashboard'> Client Area</Link> / My Domains
                </p>
                </div>

            </div>

            <ServicesAndProducts/>
        </div>
    );
};

export default MyDomains;