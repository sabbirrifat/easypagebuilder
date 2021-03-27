import { Link } from '@material-ui/core';
import React from 'react';

const DomainInformation = ({domaininfo}) => {
    return (
        <div style={{
            paddingTop:'50px',
            display : 'flex',
            justifyContent:'center',
            paddingBottom:'200px',
            flexDirection : 'column',
            height:'100%'

        }}>
            <p
                style={{
                    textAlign:'center',
                    color : 'blue'
                }}
            >{domaininfo.domainname}</p>

            <div className="abcdef">
                <a href={'http://'+domaininfo.domainname}>
                <button>
                    visit website
                </button></a>
                {domaininfo.my?
                <a  href={'/dashboard/mydomains/'+domaininfo.idx}>
                <button>
                    manage domain
                </button></a>:null
                }
                <a href={"https://www.whois.com/whois/"+domaininfo.domainname}><button>
                    WHOIS info
                </button></a>
            
            </div>
            
        </div>
    );
};

export default DomainInformation;