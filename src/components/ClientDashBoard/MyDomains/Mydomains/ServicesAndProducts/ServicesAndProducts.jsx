import React, { useEffect, useState } from 'react';
import './ServicesAndProducts.css'
import {dropdown,removeactivefromlist} from './functions.js'
import SingleProduct from './Single/SingleProduct';
import useComponentVisible from '../../../customhook/useCom';
import axios from 'axios';
import { defaultheaders } from '../../../../../utils/axios.common.header';
import { useSelector } from 'react-redux';
const ServicesAndProducts = () => {
    const translation = useSelector(state=>state.pages.translation)==='English';
    const [selectedlist,setSelectedlist] = useState("All Entries");
    const { ref, isComponentVisible,setIsComponentVisible } = useComponentVisible(true);
    const [show,setshow] = useState(0);
    const [productlist,setProductList] = useState([]);
    const selectitem = (e,id) =>{
        setIsComponentVisible(true)

        setSelectedlist(e.target.innerHTML);
        setshow(!show)
        removeactivefromlist();
        e.target.classList.add('menulistactive')
        document.querySelector('.drop-down-menues').classList.remove('close-menues');
    }



    useEffect(()=>{
        defaultheaders();
        axios.get(process.env.REACT_APP_BACKEND_URL+'/orders').then(res=>{
            setProductList(res.data);
            console.log(res);
            const activepr = [];
            setProductList([])
            res.data.map(data=>{
                if(data.DomainName && data.DomainName.length){
                    activepr.push(
                        {
                            name : "Domain - Registration",
                            linkname : data.DomainName,
                            link : data.DomainName,
                            pricing : data.DomainFirstPaymentAmmount,
                            status : data.Delivered?data.DomainIsActive:2,
                            free_account : false,
                            product_id : data.id,
                            nextduedata : data.DomainNextDueDate,
                        }
                    
                    )
                }
                
            })
            setProductList(activepr)

        });
        



    },[])


    const total_page = [1,2];
    if(!isComponentVisible){
        document.querySelector('.drop-down-menues').classList.remove('close-menues');
    }
    return (
        <div className="servicesandproducts">
            <div className="services-view">
                <div className="d_flex">
                <level>{translation?'View':'נוף'}</level> 
                    <div  ref={ref} onClick={()=>setIsComponentVisible(true)} class="dropdowns">
                        <button onClick={dropdown} class="dropdown-toggles">
                            {selectedlist} <i class="fas fa-caret-down"></i>
                        </button>
                        
                        <div className="drop-down-menues">
                            <ul>
                                <li onClick={selectitem.bind(0)} className="drop-down-menue-list menulistactive">All Entries</li>
                                <li onClick={selectitem.bind(1)} className="drop-down-menue-list">Active</li>
                            </ul>               
                        </div>
                        
                    </div>
                </div>
            </div>

            

            <div className="product00services">
                <table className="table">
                    <tr className="tr1">
                        <td className="product-sevices">
                            {translation?'Domains':'תחומים'} 
                                <div  style={{display:'none'}} className="up-down-sec">
                                    <i  class="fas fa-caret-up up activeupdown"></i>
                                    <i class="fas fa-caret-down down"></i>
                                </div>
                        
                        </td>
                        <td className="pricing width">
                            {translation?'Pricing':'תמחור'}
                            <div style={{display:'none'}} className="up-down-sec">
                                    <i class="fas fa-caret-up up"></i>
                                    <i class="fas fa-caret-down down"></i>
                            </div>
                        </td>
                        <td style={{width:'20%'}} className="next-due-date width">
                            {translation?'Next Due Date':'תאריך היעד הבא'}
                            <div  style={{display:'none'}} className="up-down-sec">
                                    <i class="fas fa-caret-up up"></i>
                                    <i class="fas fa-caret-down down"></i>
                            </div>
                        </td>
                        <td style={{width:'10%'}} className="status width">
                            
                            {translation?'Status':'סטָטוּס'}
                            <div  style={{display:'none'}} className="up-down-sec">
                                    <i class="fas fa-caret-up up"></i>
                                    <i class="fas fa-caret-down down"></i>
                            </div>
                        </td>
                        <td className="about width">
                            
                        </td>
                    </tr>
                    

                    {
                        productlist.map((data,i)=>{
                            if(show){
                                if(data.status===true) return  <SingleProduct key={i} id={i} data={data}/>;
                                else return (<div></div>)
                            }
                            else return <SingleProduct key={i} id={i} data={data}/>
                        })
                    }

                    <tr  style={{display:'none'}} className="bottom-site">
                        <div className="show-with-navigation">
                            <div>
                                show 
                            
                            </div>

                            <div class="show-pagination">
                                <select>
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>ALL</option>

                                
                                </select>
                            
                            
                            </div>
                        
                        
                        
                        </div>
                        <div className="number-navigation">
                            <button className="prev-next-button">
                                prev
                            </button>
                            

                            {
                                total_page.map((data,i)=>(
                                    <button className="number-button">
                                        {data}
                                    </button>

                                ))
                            }
                            <button className="prev-next-button">
                                next
                            
                            </button>
                        
                        </div>

                    
                    
                    
                    
                    </tr>
                
                
                </table>
            
            
            
            
            
            
            
            
            
            
            </div>






                               


        </div>
    );
};

export default ServicesAndProducts;