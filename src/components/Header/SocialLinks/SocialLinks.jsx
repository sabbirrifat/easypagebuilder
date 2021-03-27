import React, { useEffect, useState } from "react";
import './SocialLinks.css'

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/social-links`)
      .then((res) => res.json())
      .then((data) => setSocialLinks(data));
  }, []);

  const SocialIcon = ({icon, link}) => (
    <li>
      <a href={link}>
        <i className={icon} />
      </a>
    </li>
  );

  return (
    <div className="header-menu-extra">
      <ul className="list-inline">
        {
          socialLinks.length ? socialLinks.map((item, key) => (
            <SocialIcon key={key} icon={item.Icon} link={item.Link} />
          ) ) : null
        }
      </ul>
    </div>
  );
};

export default SocialLinks;
