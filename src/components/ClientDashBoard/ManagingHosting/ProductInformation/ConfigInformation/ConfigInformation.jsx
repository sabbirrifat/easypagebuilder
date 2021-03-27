import React from 'react';

const ConfigInformation = ({info}) => {
    return (
        <div className="configinfo">
            <table className="cf_t">
                <tr>
                    <td style={{
                        width : '60%',
                    }}>
                        Would you like to add DropMySite Auto Backups to your primary cPanel (up to 30 days retention)?

                    </td>
                    <td>No backup</td>
                
                
                </tr>

                <tr>
                    <td>Would you like to add a Dedicated IP address?</td>
                    <td>{info.dedicated_ip?'YES':'NO'}</td>
                
                
                </tr>

                <tr>
                    <td>Would you like to add automatic Malware scanning with file cleanup?</td>
                    <td>NO</td>
                
                
                </tr>

                <tr>
                    <td>SSL Certificates Configuration (https)</td>
                    <td>{info.ssl}</td>
                
                
                </tr>
            
            
            </table>
        </div>
    );
};

export default ConfigInformation;