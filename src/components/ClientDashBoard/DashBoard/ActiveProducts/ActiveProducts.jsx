import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { defaultheaders } from '../../../../utils/axios.common.header';
import './ActiveProducts.css'
import Spinner from '../../../Spinner/Spinner'
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
const ActiveProducts = () => {
    const [loading,setloding] = useState(1);
    const [active_product_list,setActive_Product_list] = useState([]);
    const [product_list,setProductList] = useState([])
    const translation = useSelector(state=>state.pages.translation);
    useEffect(()=>{
        defaultheaders();
        axios.get(process.env.REACT_APP_BACKEND_URL+'/orders').then(res=>{
            setProductList(res.data);
            console.log(res);
            setActive_Product_list([])
            const activepr = [];
            res.data.map(data=>{
                if(data.DomainName && data.DomainName.length && data.DomainIsActive){
                    activepr.push(
                        {
                            name : "Domain - Registration",
                            linkname : data.DomainName,
                        }
                    
                    )
                }
                if(data.HostingIsActive){
                    activepr.push({

                        name : data.HostingName+' - Hosting - Registration',
                        linkname : data.DomainName && data.DomainName.length?data.DomainName:data.UserOwnDomain,


                    })
                }
                if(data.SSL_IsActive){
                    activepr.push({
                        name : data.SSL_Issuer_Name,
                        linkname : data.DomainName && data.DomainName.length?data.DomainName:data.UserOwnDomain,
                    })
                }
                if(data.Dedicated_IP_IsActive){
                    activepr.push({
                        name : "Dedicated IP",
                    })
                }
            })
            setActive_Product_list(activepr)
            setloding(false);

        });
        setActive_Product_list([])
        



    },[])
    
    if(loading){
        return (<div
            style={{
                display:'flex',
                justifyContent:'center',
                height:'200px',
                alignItems:'center'
                
            }}
            ><CircularProgress /></div>)
      }
    return (
        <div className='active-products'>
            <div className='title'>
                {translation==='English'?'Your Active Products/Services' : 'המוצרים / שירותים הפעילים שלך'}
            </div>
            <div className='active-product-list'>
                {
                    active_product_list.map(({name,link,linkname,active},i)=>(
                        <a href={link}><div className='individual-item'>
                            <div className='item-name'>{name}</div>
                            <div className='item-linkname'>{linkname}</div>
                            <div className='active-dot'></div>
                        </div>
                        </a>
                    ))
                }
            </div>
        </div>
    );
};

export default ActiveProducts;