import React from 'react'
import './Spinner.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
    return (
        <div className="main-spinner">
            <CircularProgress color="inherit" />
        </div>
    )
}

export default Spinner
