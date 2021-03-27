import axios from 'axios';
import React, { useState } from 'react';
import { defaultheaders } from '../../../utils/axios.common.header';
import PayPalButtonx from '../../PayPal/PayPalButton';
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet';
export const RenewItemDomain = ({itemdetails}) => {
    const translation = useSelector(state=>state.pages.translation);

    function add_years(dt,n) 
    {
        return new Date(dt.setFullYear(dt.getFullYear() + n));      
    }
    const [noti,setnoti] = useState('');
    const onsucces = () =>{
        const date = new Date(itemdetails.Next_due_data);
        const setdetails = {
            OldOrder_ID : itemdetails.order_id,
            UserID : itemdetails.UserID__,
            OrderName : 'domain - renew '+ itemdetails.name,
            Total : itemdetails.Recurring_ammount,
            NextPaymentDate : add_years(date,1), 
        }
        defaultheaders();
        axios.post(process.env.REACT_APP_BACKEND_URL+'/renew-requests',setdetails).then(res=>{
            alert(translation==='English'?'payment done...':'התשלום בוצע...')
        })
    }
    const onerror = ()=>{
        alert(translation==='English'?"something is wrong...please try again letter":'משהו לא בסדר');
    }
    const oncancel = ()=>{
        alert(translation==='English'?"order canceled":'ההזמנה בוטלה')
    }
    return (
        <div className="renew-item">
        <Helmet>
            <title>renew</title>
        </Helmet>
            <div className="domain-regi">
                <p className="renew-title">{translation==='English'?'Renew':'לְחַדֵשׁ'} {itemdetails.name}</p>

                <div className="sector-a1">
                    <p>{translation==='English'?'Domain - Renew':'דומיין - חידוש'}</p>
                    <p>${itemdetails.Recurring_ammount} USD</p>
                </div>  
                <div className="sector-a1">
                    <p>{translation==='English'?'Total':'סך הכל'} </p>
                    <p>${itemdetails.Recurring_ammount} USD</p>
                </div>         
                
                <div style={
                    {
                    display : 'flex',
                    justifyContent:'center',
                    marginTop:'20px'
                    }
                }>
                    {noti.length?noti:
                    <PayPalButtonx onSuccess={onsucces} onCancel={oncancel} onError={onerror} price={itemdetails.Recurring_ammount}/>
                    }
                    </div>
            
            </div>
            
        </div>
    );
};


export const RenewItemHosting = ({itemdetails}) =>{
    const translation = useSelector(state=>state.pages.translation);

    function add_years(dt,n) 
    {
        return new Date(dt.setFullYear(dt.getFullYear() + n));      
    }
    const [noti,setnoti] = useState('');
    const onsucces = () =>{
        const date = new Date(itemdetails.Next_due_data);
        const setdetails = {
            OldOrder_ID : itemdetails.order_id,
            UserID : itemdetails.UserID__,
            OrderName : 'Hosting - renew '+ itemdetails.name,
            Total : itemdetails.Recurring_ammount,
            NextPaymentDate : add_years(date,itemdetails.billing), 
        }
        defaultheaders();
        axios.post(process.env.REACT_APP_BACKEND_URL+'/renew-requests',setdetails).then(res=>{
            
        })
    }
    const onerror = ()=>{
        alert(translation==='English'?"something is wrong...please try again letter":'משהו לא בסדר');
    }
    const oncancel = ()=>{
        alert(translation==='English'?"order canceled":'ההזמנה בוטלה')
    }
    return (
        <div className="renew-item hosstix" >
            <div className="domain-regi">
                <p className="renew-title">{translation==='English'?'Renew Hosting':'חידוש אירוח'}</p>

                <div className="sector-a1">
                    <p>{translation==='English'?'Hosting - Renew':'חידוש - אירוח'}</p>
                    <p>${itemdetails.Recurring_ammount} USD</p>
                </div>  
                <div className="sector-a1">
                    <p>Total </p>
                    <p>${itemdetails.Recurring_ammount} USD</p>
                </div>         
                
                <div style={
                    {
                    display : 'flex',
                    justifyContent:'center',
                    marginTop:'20px'
                    }
                }>
                    <PayPalButtonx onSuccess={onsucces} onCancel={oncancel} onError={onerror} price={itemdetails.Recurring_ammount}/>
                </div>
            
            </div>
            
        </div>
    );
}