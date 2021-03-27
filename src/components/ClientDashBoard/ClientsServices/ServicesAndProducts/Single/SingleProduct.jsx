import React, { useState } from 'react';
import './SingleProduct.css'
import {Link} from 'react-router-dom'
import {about_drop_down_toogle} from  './functions'
import useComponentVisible from '../../../customhook/useCom';
// name : 'Lorem Ipsum is simply dummy text ',
// link : 'loremispum-dummy.com',
// linkname : 'loremispum-dummy.com',
// pricing : 0.00,
// free_account : true,
// status : 1,

const SingleProduct = ({data,id}) => {
    const { ref, isComponentVisible,setIsComponentVisible } = useComponentVisible(true);

    const toggle = () =>{
        setIsComponentVisible(true)
        about_drop_down_toogle(id);
    }
    const [open,setOpen] = useState(0);
    const dropdowndd=()=>{
        setOpen(!open);
    } 
    if(!isComponentVisible && document.querySelectorAll('.about-dropdown')[id] && document.querySelectorAll('.about-dropdown')[id].classList.contains('about-dropdown-open')){
        document.querySelectorAll('.about-dropdown')[id].classList.remove('about-dropdown-open')

    }
    console.log(isComponentVisible)
    return (
            <div>
            <tr  className="tr1 singleproduct">
            <td className="D_mxx7">
                <button onClick={dropdowndd}>
                    {open?<i className="fas fa-minus"></i>:<i class="fas fa-plus"></i>}
                    
                </button>
            
            </td>
            
                <td className="product-sevices">
                    {data.link?
                    <Link to={data.link}>

                        <h1>{data.name}</h1><p>{data.linkname}</p>
                    </Link>
                    :<a><h1>{data.name}</h1><p>{data.linkname}</p></a>
                    }

                    
                
                </td>
                <td style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column'}} className="pricing width">
                    {data.pricing?
                        '$'+data.pricing+' USD'
                        :'FREE'}
                    {data.free_account?
                        <p>Free Account</p> 
                        : null
                    
                    }
                </td>
                <td style={{width:'20%'}} className="next-due-date width">
                    {data.nextduedata}
                </td>
                <td style={{width:'10%'}} className="status width">
                    {
                        data.status===2?
                            <div>
                                pending...
                            </div>
                        
                        :data.status?
                        <div  className="statuss">
                            <div style={{background:'#8bc34a'}} className="status-dot"></div> Active
                        </div>
                        :
                        <div className="statuss">
                            <div className="status-dot"></div> Terminated
                        </div>
                    }
                    
                </td>
                <td className="about width">
                    <i ref={ref} onClick={toggle} class="fas fa-ellipsis-h"></i>
                    <div className="about-dropdown">
                        <ul>
                            <li>view details</li>
                        </ul>
                    </div>



                </td>
            </tr>
            {open?
                <div className="D_mx7">
                    <p>Pricing : {data.pricing?
                        '$'+data.pricing+' USD'
                        :'FREE'}
                        {data.free_account?
                            <p>Free Account</p> 
                            : null
                        
                        }
                    
                    </p>
                    <p>Status : 
                        {
                            data.status?
                            <div  className="statuss">
                                <div style={{background:'#8bc34a'}} className="status-dot"></div> Active
                            </div>
                            :
                            <div className="statuss">
                                <div className="status-dot"></div> Terminated
                            </div>
                        }
                    
                    
                    </p>

                    <p>
              
                    
                    
                    
                    </p>
                
                </div>:null}



            </div>
    );
};

export default SingleProduct;