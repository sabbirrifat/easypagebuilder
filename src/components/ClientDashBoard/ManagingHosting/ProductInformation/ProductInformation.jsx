import React, { useEffect, useState } from 'react';
import './ProductInfomation.css'
import BillingInformation from './BillingInformation/BillingInformation'
import HostingInformation from './HostingInformation/HostingInformation'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../Spinner/Spinner'
import { defaultheaders } from '../../../../utils/axios.common.header';
import { RenewItemHosting } from '../../newcart/RenewItem';
import { useSelector } from 'react-redux';
import DomainInformation from './DomainInformation/DomainInformation';
import ConfigInformation from './ConfigInformation/ConfigInformation';
const ProductInformation = ({showing}) => {
    const translation = useSelector(s=>s.pages.translation)==='English'
    const [selecteditem,setSelecteditem] = useState(1);
    const productid = useParams().productid;
    const [loading,setloading] = useState(1);
    const [product_details,setPdt] = useState({});
    const [itemdess,setitemdess] = useState({});
    const [domaininfo,setdomaininfo] = useState({});
    const [exinfo,setexinfo] = useState({});
    useEffect(()=>{
        defaultheaders();
        axios.get(process.env.REACT_APP_BACKEND_URL+'/orders/'+productid).then(res=>{
            const data = res.data;
            var temp = {};
            var Nameservers = [];
            setdomaininfo({
                domainname : res.data.DomainName?res.data.DomainName:res.data.UserOwnDomain,
                my : res.data.DomainName?1:0,
                idx : res.data.id,
            })

            setexinfo({
                dedicated_ip : res.data.Dedicated_IP_Request,
                ssl : res.data.SSL_Issuer_Name
            })

            setitemdess({
                order_id: data.Order_ID,
                UserID__ : data.UserID__,
                name : data.HostingName,
                Recurring_ammount : data.HostingRecurringAmmount,
                billing : data.HostingBillingCycle,
                Next_due_data : data.HostingNextDueDate
            })
            if(data.HostingNameServers) Nameservers = data.HostingNameServers.split(' ');
            temp = {
                name : data.HostingName,
                active : data.Delivered?data.HostingIsActive:2,
                hosting_type : null,
                primary_ip : data.PrimaryIP,
                billing_overview : {
                    Registration_date : data.HostingRegistrationDate,
                    Recurring_ammount : '$'+data.HostingRecurringAmmount+'USD',
                    Next_due_data : data.HostingNextDueDate,
                    Billing_cycle : data.HostingBillingCycle+' year/s',
                    Payment_method : 'Credit Card (paypal)'
                },
                Hosting_information : {
                    Domain : data.DomainName && data.DomainName.length?data.DomainName:data.UserOwnDomain,
                    SSL_status : data.SSL_Status,
                    SSL_expiry_date : data.SSL_ExpiryDate,
                    SSL_Issuer_name : data.SSL_Issuer_Name,
                    Server_name : data.HostingServerName,
                    IP_adress : data.HostingIP_Adress,
                    Name_servers : Nameservers,
                    SSL_start_date : data.SSL_StartDate,
                },
                Disk_Usage : {
                    total : '100000M',
                    used : '100M',
                },
                Bandwith_Usages : {
                    total : '1020304050M',
                    used : '102030M',
                }
            }
            console.log(data)

            setPdt(temp)
            setloading(false)



        })



    },[]);

    if(loading){
        return (<Spinner/>)
    }
    console.log(showing)
  
    return (
        <div>
        <div className="productinformation">
            <div className="p_ffss">
                { showing?<RenewItemHosting itemdetails={itemdess}/>:
                <div className="p_ff">
                    <div className="p_box">
                        <div className="active-status">
                        {
                            product_details.active?<p className="active-gh">{product_details.active===2?'pending':'active'}</p>:<h1 className="terminated-gh">terminated</h1>
                        }
                        </div>

                        <p className="name">{product_details.name}</p>
                        <p className="hostingtype">{product_details.hosting_type}</p>
                        <div style={{padding:'20px'}}>
                            <table className="table">
                                <tr className="tr">
                                    <td className="ft-sec td">
                                        Domaing Name 
                                    </td> 
                                    <td className="st-sec td">
                                        {product_details.Hosting_information.Domain}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="ft-sec td">
                                        Primary IP
                                    </td> 
                                    <td className="st-sec td">
                                        {product_details.primary_ip}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="ft-sec td">
                                        Server Name 
                                    </td> 
                                    <td className="st-sec td">
                                        {product_details.Hosting_information.Server_name}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="ft-sec td">
                                        Nameservers
                                    </td> 
                                    <td className="st-sec td">
                                        {
                                            product_details.Hosting_information.Name_servers.map((data,i)=>(
                                                <div key={i}>
                                                    {data}<br/>
                                                </div>
                                            ))

                                        }
                                    </td>
                                </tr>
                                
                            
                            
                            </table>

                        </div>
                    
                    </div>
                </div>

                }

                
            
            </div>

            <div className="p_ss">
                    <div className="billinghostingsec">
                        <p id="ok_tx" onClick={()=>setSelecteditem(1)} className={selecteditem===1?"billactive":null}>
                        
                        <i class="fas fa-wallet"></i>  {translation?'Billing Information':'פרטי חיוב'}
                        </p>
                        <p id="ok_tx" onClick={()=>setSelecteditem(0)} className={!selecteditem?"billactive":null}>
                        <i class="fas fa-map-marker-alt"></i> {translation?'Hosting Information':'אירוח מידע'}
                       
                        </p>
                        <p id="ok_tx" onClick={()=>setSelecteditem(2)} className={selecteditem===2?'billactive':null}>
                        <i class="fas fa-globe"></i> Domain
                        </p>
                        <p id="ok_tx" onClick={()=>setSelecteditem(3)} className={selecteditem===3?'billactive':null}>
                        <i class="fas fa-tools"></i> Configurable Options
                        </p>
                    </div>

                    {
                        selecteditem===1?
                        <BillingInformation details={product_details.billing_overview}/>
                        :selecteditem===0?
                        <HostingInformation details={product_details.Hosting_information}/>
                        :selecteditem===2?
                        <DomainInformation domaininfo={domaininfo}/>
                        :<ConfigInformation info={exinfo}/>
                    }
                    




                </div>
        </div>
        </div>
    );
};

export default ProductInformation;