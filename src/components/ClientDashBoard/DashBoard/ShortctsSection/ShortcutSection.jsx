import React from 'react';
import './Shortcutsections.css'
import {connect, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { defaultheaders } from '../../../../utils/axios.common.header';
const ShortcutSection = ({logout}) => {
    const translation = useSelector(state=>state.pages.translation);
    const shotcuts = [
        {
            name : 'Register new domain',
            icon : '',
            link : '/domainregister',
            sname : 'רשום תחום חדש'
        },{
            name : ' Log out',
            icon : <i class="fas fa-sign-out-alt"></i>,
            link : '/',
            sname : 'רשום תחום חדש'
        }

    ]
    const history = useHistory();
    const logoutt = (e) =>{
        e.preventDefault();
        localStorage.removeItem('auth_token');
        defaultheaders();
        logout();
        history.push('/login')

    }
    return (
        <div className='scut-sec'>
            <div className='shortcuttitle'>
                {translation==='English'?'Shortcuts':'קיצורי דרך'}
                

            </div>
            <div className='shortcuts'>
                        <a  href={shotcuts[0].link} className=''>
                            <div className='shortcutss'>
                            
                                    {shotcuts[0].icon}
                                    {translation==='English'?shotcuts[0].name:shotcuts[0].sname}
                            </div>
                        </a>

                        <a onClick={logoutt} href={shotcuts[1].line} className=''>
                            <div className='shortcutss'>
                            
                                    {shotcuts[1].icon}
                                    {translation==='English'?shotcuts[1].name:shotcuts[1].sname}
                            </div>
                        </a>


            </div>
        </div>
    );
};
const set = dispatch =>{
    return {logout : () => dispatch({
        type : 'LOGOUT'
    })}
}
export default connect(null,set)(ShortcutSection);