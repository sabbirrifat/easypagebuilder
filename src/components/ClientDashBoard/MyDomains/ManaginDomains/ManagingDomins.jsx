import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams,Link} from 'react-router-dom'
import { defaultheaders } from '../../../../utils/axios.common.header';
import SearchBox from '../../ClientsServices/SearchBox/SearchBox'
import Spinner from '../../../Spinner/Spinner'
import {RenewItemDomain} from '../../newcart/RenewItem'
import './ManagingDomains.css'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
const ManagingDomins = () => {
    const translation = useSelector(state=>state.pages.translation)==='English';
    var id = useParams().domainname;
    const [loding,setisloading] = useState(true);
    const [domaindetails,setdomaindetails] = useState({});
    const [tab,settab] = useState(0);
    id = Number(id);
    useEffect(()=>{
        defaultheaders();
        var details = {};
        setdomaindetails({});
        axios.get(process.env.REACT_APP_BACKEND_URL+'/orders/'+id).then(res=>{
            console.log(res);
            details = {
                name :  res.data.DomainName && res.data.DomainName.length?res.data.DomainName:res.data.UserOwnDomain,
                Registration_data : res.data.DomainRegistration,
                Next_due_data : res.data.DomainNextDueDate,
                First_payment_ammount : res.data.DomainFirstPaymentAmmount,
                Recurring_ammount : res.data.DomainRecurringAmmount,
                SSL_status : 'valid SSL Detected',
                SSL_start_Date : res.data.SSL_StartDate,
                SSL_Issuer_name : res.data.SSL_Issuer_Name,
                SSL_expiry_date : res.data.SSL_ExpiryDate,
                status : res.data.Delivered?res.data.DomainIsActive:2,
                order_id : res.data.Order_ID,
                UserID__ : res.data.UserID__,
            }
            setdomaindetails(details)
            console.log(details)

        }).catch(err=>console.log(err))

        setisloading(false)



    },[])

    if(loding){
        return (<Spinner/>)
    }
    
    return (
        <div className="manage-domains">
        <Helmet>
            <title>manage domain</title>
        </Helmet>
        <div className='top-com'>
            <div className='title'><h1>{translation?'Managing':'ניהול'} {domaindetails.name}</h1>
            <p style={{letterSpacing:'1px'}}>
            <Link to='/'>Portal Home</Link> /
            <Link to='/dashboard'> Client Area</Link> / <Link to="/dashboard/mydomains">My Domains </Link> / {domaindetails.name}
            </p>
            </div>

        </div>

        <div className="dd_xs">
            <div className="dd_mg">
                <div className="dd_mt">
                    {translation?'Actions':'פעולות'} 
                </div>
                <div className="ult_yy">
                    <ul>
                        <li className={!tab?'active-li':null} onClick={()=>settab(0)}><i class="fas fa-angle-double-right"></i>  {translation?'Information':'מֵידָע'}</li>
                        <li className={tab?'active-li':null} onClick={()=>settab(1)}><i class="fas fa-angle-double-right"></i>  {translation?'Renew':'לְחַדֵשׁ'}</li>
                        <a href="/domainregister"><li>{translation?'Register new domain':'רשום תחום חדש'}</li></a>
                    
                    </ul>
                
                </div>
            
            </div>
            
            <div className="dd_mgm">
                <div className="dd_mgm_title">
                    {translation?'overview':'סקירה כללית'}
                </div>
                <div className="_d_flex__">
                    <div className="dd_atff">
                    {tab?<RenewItemDomain itemdetails={domaindetails}/>:
                        <div className="dd_atf_blackBox">
                            <i class="fas fa-globe"></i>
                            <p className="__dd__name__">{domaindetails.name}</p>
                            <p className="_dd_box_status__">{translation?'Status : ':'סטטוס : '}
                                {
                                    domaindetails.status?
                                    <p className="_dd_active_">{domaindetails.status===2?'pending':'active'}</p>
                                    :
                                    <p className="_dd_terminated_">terminated</p>

                                }
                            
                            
                            </p>
                        </div>
                    }

                    
                    </div>

                    <div className="dd_atss">
                        <div className="fake_dd_atss">
                            <div className="dd_sec_pxx">
                                <p>{translation?'Registration Date :':'תאריך רישום :'} </p>
                                <p>{domaindetails.Registration_data}</p>
                            </div>
                            <div className="dd_sec_pxx">
                                <p>{translation?'Next Due Date :':'תאריך היעד הבא:'} </p>
                                <p>{domaindetails.Next_due_data}</p>
                            </div>
                            <div className="dd_sec_pxx">
                                <p>{translation?'First Payment Ammount :':'סכום תשלום ראשון:'} </p>
                                <p>${domaindetails.First_payment_ammount} USD</p>
                            </div>
                            <div className="dd_sec_pxx">
                                <p>{translation?'Recurring Ammount :':'סכום חוזר:'} </p>
                                <p>${domaindetails.Recurring_ammount} USD</p>
                            </div>
                            <div className="dd_sec_pxx">
                                <p>{translation?'Payment Method :':'אמצעי תשלום :'} </p>
                                <p>paypal</p>
                            </div>
                        </div>
                    </div>
                
                </div>
                                
                <div className="dd_bottom_ssl">
                    <div className="fake_dd_bottom_ssl">
                    <p className="dd_ssl">SSL</p>

                    <div className="trd">
                        <table className="dd_table_ssl">
                            <tr className="dd_tr">
                                <td className="dd_td">
                                    {translation?'SSL Status : ':'סטטוס SSL:'}
                                </td>
                                <td className="dd_td">
                                    {domaindetails.SSL_status}
                                </td>
                            </tr>
                            <tr className="dd_tr">
                                <td className="dd_td">
                                    {translation?'SSL Start Date : ':'תאריך התחלה של SSL:'}
                                </td>
                                <td className="dd_td">
                                    {domaindetails.SSL_start_Date}
                                </td>
                            </tr>
                            <tr className="dd_tr">
                                <td className="dd_td">
                                    {translation?'SSL Issuer Name :':'שם מנפיק SSL:'} 
                                </td>
                                <td className="dd_td">
                                    {domaindetails.SSL_Issuer_name}
                                </td>
                            </tr>
                            <tr style={{borderBottom:'none'}} className="dd_tr">
                                <td className="dd_td">
                                    {translation?'SSL Expiry Date : ':'תאריך תפוגה של SSL:'}
                                </td>
                                <td className="dd_td">
                                    {domaindetails.SSL_expiry_date}
                                </td>
                            </tr>
                            
                        
                        
                        </table>
                    
                    </div>
                    </div>
                </div>

            </div>


            
        
        
        
        
        </div>

    </div>
    );
};

export default ManagingDomins;