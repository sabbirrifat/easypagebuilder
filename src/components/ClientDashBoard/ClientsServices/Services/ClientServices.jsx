import React, { useState } from 'react';
import './ClientServices.css'
import {Link} from 'react-router-dom'
import SearchBox from '../SearchBox/SearchBox';
import ServicesAndProducts from '../ServicesAndProducts/ServicesAndProducts';
import { useSelector } from 'react-redux';
const ClientServices = () => {
    const translation = useSelector(state=>state.pages.translation)==='English'
    const [searchfield,setSearchfield] = useState('');
    const setsearchfield = (value)=>{
        setSearchfield(value)
    }

    return (
        <div className='clinetservices'>
            <div className='top-com'>
                <div className='title'><h1>{translation?'My Products & Services':'המוצרים והשירותים שלי'}</h1>
                <p style={{letterSpacing:'1px'}}>
                <Link to='/'>Portal Home</Link> /
                <Link to='/dashboard'> Client Area</Link> / My Products & ClientServices
                
                

                </p>
                </div>
                <SearchBox setfield={setsearchfield}/>
            </div>
            <ServicesAndProducts searchfield={searchfield}/>
        </div>
    );
};

export default ClientServices;