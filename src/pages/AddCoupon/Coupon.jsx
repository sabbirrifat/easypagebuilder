import axios from 'axios';
import React, { useState } from 'react';
import './style.css'
const Coupon = ({setcoupon}) => {
    const [value,setvalue] = useState('');
    const [show,setshow] = useState(0);
    const [noti,setnoti] = useState(null);
    const checkdate = (date,date1,date2) => {
        if(date>=date1 && date<=date2) return true;
        return false;
    }
    const [color,setcolor] = useState('red');
    const check = () =>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/coupons/'+value).then(res=>{
            const sdate = String(res.data.CouponStartDate);
            const edate = String(res.data.CouponEndDate);
            const nowdate = new Date();
            console.log(nowdate)

            var yr = String(nowdate.getFullYear());
            var mth = String(nowdate.getMonth()+1);
            if(mth.length===1){
                mth = '0'+mth;
            }

            var date = String(nowdate.getDate());
            if(date.length===1){
                date = '0'+date;
            }
            const nwo = `${yr}-${mth}-${date}`;
            if(!checkdate(nwo,sdate,edate)){
                setcolor('red');

                setnoti('Coupon is not active');
            }
            else{
                console.log('ok')
                setcoupon({
                    CouponID : res.data.CouponID,
                    CouponDiscount : res.data.CouponDiscount
                    
                })
                setcolor('green')
                setnoti(`${res.data.CouponDiscount}% discount`)
            }

            


        }).catch(err=>{
            setcolor('red');
            setnoti('Coupon not found');


        })



    }
    const coponwrite = (e)=>{
        setvalue(e.target.value);
        setcoupon({});
    }
    console.log('show '+show)
    
    return (
        <div className="addcoupon">
            {value.length?
                <button onClick={check} className="t_xtcpnap">
                    apply coupon
                </button>
            :
                <button onClick={()=>setshow(!show)} className="t_xtcpn">
                    add a coupon
                </button>

            }

            {show?<div>
                <input onChange={coponwrite} placeholder="Write your coupon" className="coupon-inpuot" />
                <div style={{
                    color:color,
                    textTransform:'uppercase',
                    textAlign : 'center'
                    
                }}>{noti}</div>
            
            
            
                </div>
            :null}
            
        </div>
    );
};

export default Coupon;