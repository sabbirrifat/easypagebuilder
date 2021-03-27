import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RegisterDomain.css'
const RegisterDomain = ({setdomain}) => {
    const translation = useSelector(state=>state.pages.translation);
    const [domain,setdomainn] = useState('');
    const history = useHistory();
    const goodbye = ()=>{
        if(domain.length===0) return 0;
        setdomain(domain);
        history.push('/domainregister')

    }
    return (
        <div className="registerdomain">
            <div className='title'>
                {translation==='English'?'Register a New Domain':'רשום דומיין חדש'}
            </div>
            <div className='form'>
                <input onChange={(e)=>setdomainn(e.target.value)} />
                <div className='buttona'> 
                <button onClick={goodbye} style={{background:'#7c9bf9',width:'100%'}}> {translation==='English'?'search':'לחפש'}</button>
                </div>
            </div>
            
        </div>
    );
};

const set = dispatch =>({
    setdomain : (value) => dispatch({
        type : 'DASHBOARD_DOMAIN_REGISTER',
        payload : value,
    })
})
export default connect(null,set)(RegisterDomain);