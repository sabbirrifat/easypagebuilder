import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";


const PayPalButtonx = ({onSuccess, onCancel, price, onError }) => {
    const [clientId,setclientid] = useState('');
    const [loading,setloading] = useState(1);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'/pay-pal').then(res=>{
            setclientid(res.data.Client_Id);
            setloading(0);
        }).catch(err=>{
            alert('something is error');
        })
    })
    if(loading){
        return (
            <CircularProgress/>
        )
    }
    const client = {
        sandbox: clientId,
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
        <PayPalButton
        options={{
            clientId: clientId,
          }}
        
        client={client} currency={'USD'} amount={price} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    )
}

export default PayPalButtonx
