import React from 'react';
import { connect, useSelector } from 'react-redux';
import './InfoSections.css'
const InfoSection = ({user}) => {
    const translation = useSelector(state=>state.pages.translation);
    console.log(user)
    const details = {
        name : user.FullName,
        adress : user.Adress,
        city : user.City,
        state : user.State,
        ZipCode : user.ZipCode,
        country :  user.Country,

    }
    return (
        <div className='info-sec'>
            <h2>
                {translation==='English'?'Your Info':'המידע שלך'}
            </h2>
            <p style={{textTransform:'capitalize'}}>
                {details.name}
               
            </p>
            <br/>
            <p style={{textTransform:'capitalize'}}>
                {details.adress}
            </p>
            <p style={{textTransform:'capitalize'}}>
                {details.city}{', '}{details.state}{', '}{details.ZipCode}
            </p>
            <p style={{textTransform:'capitalize'}}>
                {details.country}
            </p>

        </div>
    );
};
const get = state =>({
    user : state.user.user,
})
export default connect(get)(InfoSection);