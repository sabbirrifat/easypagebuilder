import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './SearchBox.css'
const SearchBox = ({setfield}) => {
    const translation = useSelector(state=>state.pages.translation)==='English';

    function changeback(){
        document.querySelector('.searchboxa1').style.border = '1px solid #262626';
        
    }
    function changeback2(){
        document.querySelector('.searchboxa1').style.border = '1px solid #98989857';
        
    }
    const setfieldd = (event) =>{
        setfield(event.target.value)
    }
    return (
        <div className='searchboxa1'>
        <i className="fas fa-search"></i><input onChange={setfieldd} onBlur={changeback2} onFocus={changeback} placeholder={translation?'Enter search term...':'הזן מונח חיפוש ...'} type='search'/>
            
        </div>
    );
};

export default SearchBox;