import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css'
import Spinner from '../../../../Spinner/Spinner'
import axios from 'axios'
import PayPalButtonx from '../../../../PayPal/PayPalButton'
import Coupon from '../../../../../pages/AddCoupon/Coupon';
import { Helmet } from 'react-helmet';
const Register = ({user,domainal,cleardomain}) => {
    if(!localStorage.getItem('auth_token') || !user){
        history.pushState('/login')
    }
    function CheckIsValidDomain(domain) { 
        var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
        return domain.match(re);
    } 
    const [domain,setdomain] = useState(domainal);
    const history = useHistory();
    const [show,setshow] = useState(0);
    const [noti,setnoti] = useState(null)
    const [abl,setabl] = useState(1);
    const [api,setapi] = useState('');
    const [loading,setloading]  = useState(1);
    const [checkout,setcheckout] = useState(false);
    const [coupon,setcoupon] = useState({});
    const [domainprice,setdomainprice] = useState(0);

    //onSuccess, onCancel, price, clientId, onError
    function add_years(dt,n) 
    {
        return new Date(dt.setFullYear(dt.getFullYear() + n));      
    }
    const onSuccess = async () =>{
        const total = coupon.CouponDiscount?(domainprice-(coupon.CouponDiscount/100*domainprice)).toFixed(2):domainprice;
        const nowdate = new Date();
        const nextyr = add_years(nowdate,1);
        const order_details = {
            Email: user.email,
            Name: user.FullName,
            Order_ID: new Date().valueOf(),
            Total: total,
            DomainName : domain,
            DomainRegistration : new Date(),
            DomainNextDueDate : nextyr,
            DomainFirstPaymentAmmount : total,
            DomainRecurringAmmount : domainprice,
            Delivered: false,
            UserID__ : user.id, 
            CouponName : coupon.CouponID?coupon.CouponID:null,
            Discount : coupon.CouponID?coupon.CouponDiscount:null,
          } 

          await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization' : 'Bearer '+localStorage.getItem('auth_token')
            },
            body: JSON.stringify(order_details),
            })
            .then((data) => {
                cleardomain();
                history.push('/dashboard')

            })
            .catch((error) => {
               alert('You can ask for refund...Please contact us')
        });

    }
    const onCancel = () =>{
        alert('cancel');
    }
    const price = domainprice;
    const onError = () =>{
        alert('error')
    }
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/domain-availability').then(res=>{
            setapi(res.data.API);
            setloading(false)
        }).catch(err=>{
            alert('something is wrong...')
        });
        axios.get(process.env.REACT_APP_BACKEND_URL+'/domain-price').then(res=>{
            setdomainprice(res.data.Price);
        })


    },[])
    if(loading){
        return (
            <Spinner/>
        )
    }

    const search = () =>{
        if(domain.length===0) return;
        if(!CheckIsValidDomain(domain)){
            setnoti('Domain is not valid');
            return 0;
        }

        axios.get(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${api}&domainName=${domain}&credits=DA`)
        .then((data) => {
            //setDomainAvailability(data.DomainInfo.domainAvailability));
            setabl(data.data.DomainInfo.domainAvailability==="AVAILABLE");
            setshow(true)

    
        }).catch(()=>{
            alert('something is wrong...')
        })
    }


    const inputhandle = (e) =>{

        setdomain(e.target.value)
        setshow(0);
        setnoti(null)
    }
    return (
        <div className="domain-register">
        <Helmet>
            <title>Register Domain</title>
        </Helmet>
        <p style={{color:'red',textAlign:'center'}}>{noti?noti:<br/>}</p>

            <div className="main__xx">
                <div className="drx_in">
    
                <i class="fas fa-search"></i>
                    <input onChange={inputhandle} value={domain}/>
                    <button onClick={search}>SEARCH</button>
                
                </div>
            
            

            </div>
            {show?
            <div>
            {abl?
            <div className="main__xx txt_yy">
                <div className="drx_in true">
                <div className="domain-availibiti"> <p style={{margin:'auto',color:'black',fontSize:'20px',lineHeight:'80px',fontWeight:'bold'}}> {domain} </p></div>
                <div className="checkout">

                    <button onClick={()=>setcheckout(true)} >Checkout</button>
                </div>
                
                </div>
            
            
            </div>
            :
            <div className="main__xx txt_yy">
                <div className="drx_in false">
                    <p style={{margin:'auto',color:'black',fontSize:'20px',fontWeight:'bold'}}>{domain} is not available</p>
                </div>
            
            
            </div>

            }
            </div>

            :
            null
        }
        {checkout?
            <div className="checkout-comp">
                <div className="domain-registraion-cart">
                    <p>Domain - Registration </p>
                    <p>${domainprice} USD</p>
                
                </div>
                {coupon.CouponDiscount?
                    <div className="domain-registraion-cart">
                    <p>Discount </p>
                    <p>{coupon.CouponDiscount}%</p>
                
                </div>
                    :null} 

                <div className="domain-registraion-cart">
                    <p>Total </p>
                    {coupon.CouponDiscount?
                    <p>${
                        (domainprice-(coupon.CouponDiscount/100*domainprice)).toFixed(2)



                    } USD</p>:<p>${domainprice} USD</p>}
                
                </div>
            
                <Coupon setcoupon={setcoupon}/>
                <div style={{height:'30px'}}></div>
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                }}>
                <PayPalButtonx onCancel={oncancel} onError={onError} onSuccess={onSuccess} price={
                    coupon.CouponDiscount?(domainprice-(coupon.CouponDiscount/100*domainprice)).toFixed(2):domainprice




                }/>
                </div>
                
            
            </div>:
        null}
        


        </div>
    );
};

const get = ({user,ddrd})=>({
    user : user.user,
    domainal : ddrd.domain,
})
const set = dispatch =>({
    cleardomain : () => dispatch({
        type : 'DASHBOARD_DOMAIN_REGISTER',
        payload : '',
    })
})
export default connect(get,set)(Register);
