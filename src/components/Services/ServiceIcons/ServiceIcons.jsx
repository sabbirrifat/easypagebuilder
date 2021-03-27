import React from 'react';
import IconBox from './IconBox';


const ServiceIcons = ({values}) => {
    return (
        <div className="section-sm">
        <div className="container">
          <div className="row text-center icon-4xl">
            {
                values.map((item, key) => <IconBox key={key} item={item} icon={item.Icon} />)
            }          
            
          </div>
        </div>
      </div>
    )
}

export default ServiceIcons
