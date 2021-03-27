import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel3';
import './DetailCountComponent.css'
import axios from 'axios'
import {defaultheaders} from '../../../../utils/axios.common.header'
import Spinner from '../../../Spinner/Spinner'
import { CircularProgress } from '@material-ui/core';
const DetailCountComponent = () => {
    const [clc,setclc] = useState(0);
    const [dlc,setdlc] = useState(0);
    const [scc,setscc] = useState(0);
    const [dipc,setdipc] = useState(0);
    const [loding,setloding] = useState(1);
    useEffect(()=>{
        defaultheaders();
        axios.get(process.env.REACT_APP_BACKEND_URL+'/orders').then(res=>{
            var cc = 0,dc =0,sc=0,dip=0;
            res.data.map((data)=>{
                if(data.DomainName && data.DomainName.length){
                    dc++;
                }
                if(data.HostingName && data.HostingName.length){
                    cc++;
                    sc++;
                }
                if(data.Dedicated_IP_Request) {
                    dip++;
                }
                


            })
            setclc(cc);
            setdlc(dc);
            setscc(sc);
            setdipc(dip);
            setloding(false)
        })



    },[])



    const list = [
        {
            name : 'My Cloud',
            link : '/',
            count : clc,
        },
        {
            name : 'Domains',
            link : '/',
            count : dlc,
        },
        {
            name : 'SSL',
            link : '/',
            count : scc,
        },
        {
            name : 'Dedicated IP',
            link : '/',
            count : dipc,
        },
    ];
    const options = {
        loop: true,
        nav: false,
        dots: true,
        smartSpeed: 2000,
        margin: 30,
        autoplayHoverPause: true,
        autoplay: false,
        responsive: {
          0: {
            items: 1,
          },
          576: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1200: {
            items: 4,
          },
        },
      };

      if(loding){
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
        <div className='detailcountcomponent' dir="ltr">
                <div className='count-sec'>
                    <OwlCarousel className="partner-slider owl-carousel owl-theme" {...options} >
                
        
                        {
                            list.map(({name,link,count},i)=>(
                                <div key={i} className='counter'>
                                    <div className='count-name'> 
                                        <div className='count'>{count}</div>
                                        <div className='name'>{name}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </OwlCarousel>
                </div>
        </div>
    );
};

export default DetailCountComponent;