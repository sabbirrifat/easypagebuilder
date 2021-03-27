import React from 'react';
import { Helmet } from 'react-helmet';
import OwlCarousel from 'react-owl-carousel3';
import { useSelector } from 'react-redux';
import ActiveProducts from '../ActiveProducts/ActiveProducts';
import DetailCountComponent from '../DetailCountComponent/DetailCountComponent';
import InfoSection from '../InfoSection/InfoSection';
import RegisterDomain from '../RegisterDomain/RegisterDomain';
import ShortcutSection from '../ShortctsSection/ShortcutSection';
import './DashBoardBody.css'
const DashBoardBody = () => {
    const translation = useSelector(state=>state.pages.translation)
    return (
        <div className='dash-body res'>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
            <div className='title'>
                <h1>{translation==='English'?'My Dashboard':'לוח המחוונים שלי'}</h1>
                <p><a href='/'>Portal Home</a> / Client Area</p>

                            
            </div>
            <div className='row'>
                <div className='col-3 info-body'>
                    
                    <div className='left-side'>
                        <InfoSection/>
                        <div className='srt1'><ShortcutSection/></div>
                    </div>
                </div>
                <div className='col-9'>
                    <DetailCountComponent/>
                    <div className='row actreg'>
                        <div className='col-6 extra'>
                            <ActiveProducts/>
                        </div>
                        <div className='col-6'>
                            <RegisterDomain/>
                        </div>
                    
                    </div>
                </div>  
            
            </div>
            <div className='srt2'><ShortcutSection/></div>

            
        </div>
    );
};

export default DashBoardBody;