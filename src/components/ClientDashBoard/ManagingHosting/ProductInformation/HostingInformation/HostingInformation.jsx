import React from 'react';
import './HostingInformation.css'

const HostingInformation = ({details}) => {
    return (
        <div className="hosting-sev">
        <div className="billinginfo">
        <table className="t_xx">
        <tr style={{height:'60px'}}>
            <td>
            Domain 

            </td>
            <td>
                {details.Domain}<br/>
                <a href={'http://'+details.Domain}><button className="a_xx_tt">
                    visit website
                </button></a>
            
            </td>
        
        </tr>
        <tr>
            <td>
            SSL Status

            </td>
            <td>
                {details.SSL_status}
            
            </td>
        
        </tr>
        <tr>
            <td>
            SSL Start Date

            </td>
            <td>
                {details.SSL_start_date}
            
            </td>
        
        </tr>
        <tr>
            <td>
            SSL Expiry Date

            </td>
            <td>
                {details.SSL_expiry_date}
            
            </td>
        
        </tr>

        <tr>
            <td>
            Server Name

            </td>
            <td>
                {details.Server_name}
            
            </td>
        
        </tr>
        <tr>
            <td>
            IP Address

            </td>
            <td>
                {details.IP_adress}
            
            </td>
        
        </tr>
        <tr>
            <td>
            Nameservers

            </td>
            <td>
                {details.Name_servers.map((data,i)=>(

                    <p key={i}>
                    {data}
                    </p>


                ))}
            
            </td>
        
        </tr>
    
    
        </table>
        </div>
        </div>
    );
};

export default HostingInformation;