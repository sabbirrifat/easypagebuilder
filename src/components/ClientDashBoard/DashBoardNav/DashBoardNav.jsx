import React, { useEffect, useState } from 'react';
import './DashBoardNav.css'
import {NavLink, Route, useHistory} from 'react-router-dom'
import { connect, useSelector } from 'react-redux';

const DashBoardNav = ({changetr,logot}) => {
    // changetr();
    const user = useSelector(state=>state.user.user);
    const translation = useSelector(state=>state.pages.translation);
    const [open,setOpen] = useState(false);
    const [logo,setLogo] = useState(null);
    const [nologo,setNologo] = useState(true);
    const [navshowor,setnavshow] = useState(false);
    const history = useHistory();
    const myFunction=()=> {
        setnavshow(false);
        var x = document.querySelector('.container');
        if(x.classList.contains('change')) {
            x.classList.remove('change');
            const a = document.querySelector('.dash-nav').classList.remove('add-plus');

        }
        else {
            x.classList.add('change');
            const a = document.querySelector('.dash-nav').classList.add('add-plus');

        }
    }
    useEffect(()=>{
        fetch('http://localhost:1337/logo').then(res=>res.json())
        .then(res=>{
            setLogo('http://localhost:1337'+res.Image[0].url);
        }).catch(err=>(
            setNologo(false)
        ))

    });
    const logout = () =>{
        localStorage.removeItem('auth_token');
        logot();
        history.push('/login')

        
    }
    return (
        <div className='dashop'>
            <div className='dash-top'>
                <h1>
                    {
                        (!logo&&nologo)?<p style={{fontSize:'13px'}}>wait</p>
                        :(!nologo)?<p style={{fontSize:'13px'}}>not found</p>
                        :<img className='nav-logo' src={logo} alt='img'/>
                    }
                </h1>
                <div className='menubar'>
                    <div className="container" onClick={myFunction}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
            </div>
            <div className='fakediv'></div>
            <div className='dash-nav'>

                <ul>
                    <a href="/" activeClassName='active-dash-nav' exact to='/dashboard'><li><i className="fas fa-home"></i><p>{translation==='English'?'Home':'בית'}</p></li></a>
                    <NavLink activeClassName='active-dash-nav' exact to='/dashboard'><li><i class="fas fa-tools"></i><p>{translation==='English'?'Dashboard':'בית'}</p></li></NavLink>
                   
                    <NavLink activeClassName='active-dash-nav' exact to="/dashboard/services"><li><i className="fas fa-cloud"></i><p>{translation==='English'?'My Cloud':'הענן שלי'}</p></li></NavLink>
                    <NavLink activeClassName='active-dash-nav' exact to='/dashboard/mydomains'><li><i class="fas fa-globe"></i><p>{translation==='English'?'Domains':'תחומים'}</p></li></NavLink>
                    <li onClick={()=>setnavshow(!navshowor)} className="trxs"><i class="fas fa-cog"></i><p>{translation==='English'?'More':'תחומים'}</p>
                        
                    
                    </li>


                </ul>
            </div>
            {navshowor?
            <div className="okxt">
                <p className="name-nav">{user.FullName}</p>
                <div className="change-nav-l">
                    <button onClick={()=>changetr('English')} className={`a1 ${translation==='English'?'active-ld':null}`}>
                        English
                    </button>
                    <button onClick={()=>changetr("Hebrew")} className={`a2 ${translation!=='English'?'active-ld':null}`}>עִברִית</button>
                
                </div>

                <p style={{
                    cursor : 'pointer',
                }} onClick={logout} className="lgout">Logout</p>

            
            
            
            </div>
            :null}
        </div>
    );
};
const set = dispatch=>({
    changetr : (value)=>dispatch({
        type : 'CHANGE_TRANSLATION',
        payload : value,
    }),
    logot : ()=> dispatch({
        type : 'LOGOUT'
    })
})
export default connect(null,set)(DashBoardNav);