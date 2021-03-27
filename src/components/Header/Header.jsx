import React, { useEffect, useState } from "react";
import "./Header.css";
import SocialLinks from "./SocialLinks/SocialLinks";
import { Helmet } from "react-helmet";
import { Dropdown } from "react-bootstrap";
import Logo from "./Logo/Logo";
import { updateTranslation } from "../../Redux/Pages/pages-action";
import { connect } from "react-redux";
import FormattedText from "../../hooks/FormattedText";

const Header = ({ blackBack, translation, updateTranslation, colors,user }) => {
  const [menus, setMenus] = useState([]);
  const [handleShow, setHandleShow] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [togle, setTogle] = useState(false);
  const [navDropDownToggle, setNavDropDownToggle] = useState(false);
  const [username,setusername] = useState(user?user.FullName.split(' ')[0]:' ');
    // if(user){
    //   setusername(user.FullName.split(' ')[0])
    // }


  const dropDownStyle = () => {
    if(translation === 'Hebrew'){
      if(navDropDownToggle){
        return {
          right: '0',
          left: 'auto',
          display: 'block',
          color: JSON.parse(colors.navlink_color).css
        }
      }
      else{
        return {
          right: '0',
          left: 'auto',
          color: JSON.parse(colors.navlink_color).css
        }
      }
    }
    else{
      if(navDropDownToggle){
        return {
          display: 'block',
          color: JSON.parse(colors.navlink_color).css
        }
      }
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/menus`)
      .then((res) => res.json())
      .then((data) => setMenus(data));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/favicon`)
      .then((res) => res.json())
      .then((data) => setFavicon(data.Favicon.url));


      
  }, []);





  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        setHandleShow(true);
      } else {
        setHandleShow(false);
      }
    });
    /* return () => {
      window.removeEventListener("scroll");
    }; */
  }, []);

  const NavElement = ({ item, link }) => (
    <li className="nav-item" style={{ marginLeft: "14px" }}>
      <a className="nav-link" href={link} style={{  color: JSON.parse(colors.navlink_color).css }}>
        <FormattedText objectName={item} extension="Name" />
      </a>
    </li>
  );

  const NavDropDown = ({ item, link }) => (
    <li class="nav-item" style={{ color: JSON.parse(colors.navlink_color).css }}>
      <a class="nav-link d-toggle" href={link} style={{  color: JSON.parse(colors.navlink_color).css }}>
        <FormattedText objectName={item} extension="Name" />
      </a>
      <ul class="nav-dropdown" style={dropDownStyle()}>
        {item.Dropdown.map((dropitem, key) => (
          <li class="nav-dropdown-item" key={key} style={translation === 'Hebrew' ? { textAlign: 'right'} : {}}>
            <a
              class="nav-dropdown-link"
              href={`/${dropitem.Link}`}
            >
              <FormattedText objectName={dropitem} extension="Name" />
            </a>
          </li>
        ))}
      </ul>
      <a class="nav-dropdown-toggle" onClick={() => setNavDropDownToggle(!navDropDownToggle) }></a>
    </li>
  );

  const handleToggle = () => {
    setTogle(!togle);
  };

  return (
    <>
      {favicon ? (
        <Helmet>
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.REACT_APP_BACKEND_URL}${favicon}`}
            sizes="64x64"
          />
        </Helmet>
      ) : null}
      <div
        className="header right absolute-light sticky-autohide"
        style={handleShow || blackBack ? { background: JSON.parse(colors.nav_color).css } : {}}
      >
        <div className="container">
          <Logo />
          <div className={`header-menu ${togle ? "show" : ""}`}>
            <ul className="nav">
              {menus.length
                ? menus.map((item, key) => {
                    if (item.Dropdown.length) {
                      return (
                        <NavDropDown key={key} item={item} link={item.Link} />
                      );
                    } else {
                      return (
                        <NavElement key={key} item={item} link={item.Link} />
                      );
                    }
                  })
                : null}
                <li className="nav-item">
                  {
                    user?<a className="nav-link" href="/dashboard">{username}</a>:<a className="nav-link" href="/login">Login</a>
                  }
               </li>
                

            </ul>
          </div>

          <SocialLinks />

          
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                background: "transparent",
                marginLeft: "12px",
                border: "none",
              }}
            >
              {translation}
            </Dropdown.Toggle>
            {translation === "Hebrew" ? (
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => updateTranslation("English")}
                >
                  🇺🇸 - English
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => updateTranslation("Hebrew")}
                >
                  עִברִית - 🇮🇱
                </Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => updateTranslation("English")}
                >
                  English - 🇺🇸
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => updateTranslation("Hebrew")}
                >
                  עִברִית - 🇮🇱
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>

          <button
            className={`header-toggle ${togle ? "toggle-close" : ""}`}
            onClick={handleToggle}
          >
            <span />
          </button>
        </div>

        {/* end container */}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTranslation: (language) => dispatch(updateTranslation(language)),
});

const mapStateToProps = ({ pages,user }) => ({
  translation: pages.translation,
  colors: pages.colors,
  user : user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
