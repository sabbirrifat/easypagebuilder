import React from 'react'

const GoogleMap = ({values}) => {
    return (
        <div className="container-fluid padding-0">
			<div id="map1" className="gmap gmap-xl" data-latitude={values[0].Lattitude} data-longitude={values[0].Longitude}></div>			
		</div>
    )
}

export default GoogleMap