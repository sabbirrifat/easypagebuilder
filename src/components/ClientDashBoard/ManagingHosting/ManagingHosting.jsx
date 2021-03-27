import React, { useState } from 'react';
import {Link,NavLink, Route} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import './ManagingHosting.css'
import { Switch } from '@material-ui/core';
import ProductInformation from './ProductInformation/ProductInformation';
import ProductAddons from './ProductAddons/ProductAddons'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
const ManagingHosting = () => {
    const [iscalinfo,setIscalinfo] = useState(1);
    const translation = useSelector(state=>state.pages.translation)==='English'
    const product_details = {
    }
    return (
        <div className='clinetservices'>
        <Helmet>
            <title>manage hosting</title>
        </Helmet>
            <div className='top-com'>
                <div className='title'><h1>{translation?'Managing Hosting':'ניהול אירוח'} {product_details.name}</h1>
                <p style={{letterSpacing:'1px'}}>
                <Link to='/'>Portal Home</Link> /
                <Link to='/dashboard'> Client Area</Link> / <Link to="">My Products & ClientServices</Link> / {product_details.name}
            
                </p>
                </div>
            </div>
            <div className="domain-info">
                <div className="first-sec">
                    <p className="title1">
                        {translation?'overview':'סקירה כללית'}
                    </p>   
                    <div className="tx_x_t">
                    <div onClick={()=>setIscalinfo(1)} className={iscalinfo?"dxx-active":""}><p className="info dxx active "><i class="fas fa-angle-double-right"></i> {translation?'Information':'מֵידָע'}</p></div>
                    <div onClick={()=>setIscalinfo(0)} className={!iscalinfo?"dxx-active":""}>
                    <p className="addon dxx active"><i class="fas fa-angle-double-right"></i> {translation?'Renew':'לְחַדֵשׁ'}</p></div>
                    
                    </div>
                </div>
                <div className="details-sec">
                    <ProductInformation showing={!iscalinfo} product_details={product_details}/>
                    
                
                </div>
            
            </div>
        </div>
    );
};

export default ManagingHosting;