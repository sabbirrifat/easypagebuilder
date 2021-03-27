import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateColors, updatePagesData, updateTranslation } from './Redux/Pages/pages-action';
import Custom from './pages/Custom/Custom';
import Blog from './components/Blog/Blog';
import SinglePost from './components/SinglePost/SinglePost';
import Whatsapp from './components/Whatsapp/Whatsapp';
import PopUp from './components/PopUp/PopUp';
import Domain from './pages/Domain/Domain';
import Checkout from './pages/Checkout/Checkout';
import Cart from './pages/Cart/Cart';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './App.css';
import Spinner from './components/Spinner/Spinner';
import { updatePopupStatus } from './Redux/Popup/popup-action';
import DashboardComponent from './components/ClientDashBoard/DashBoardComponent/DashboardComponent';
import UserLogin from './components/ClientDashBoard/UserLogin/UserLogin';
import Register from './components/ClientDashBoard/DashBoard/RegisterDomain/RegisterPage/Register';

function App({ updatePagesData, translation, updateTranslation, popupStatus, updatePopupStatus, updateColors, colors }) {

  const [popModelShow, setPopModelShow] = useState(false);
  const [popUpDatails, setPopUpDatails] = useState({});
  const [rtlSetup, setRtlSetup] = useState({ 'dir': 'ltr' })

  useEffect(() => {
    if (!translation) {
      fetch('https://geolocation-db.com/json/09068b10-55fe-11eb-8939-299a0c3ab5e5')
        .then(res => res.json())
        .then(data => {
          if (data['country_name'] === 'Israel') {
            updateTranslation("Hebrew")
          }
          else {
            updateTranslation("English")
          }
        })
    }
  }, [])


  useEffect(() => {
    const dataFetching = () => fetch(`${process.env.REACT_APP_BACKEND_URL}/pages`)
      .then(res => res.json())
      .then(data => {
        updatePagesData(data)
      })
    dataFetching()

    return () => {
      dataFetching()
    }
  })

  useEffect(() => {
    if(!colors){
      fetch(`${process.env.REACT_APP_BACKEND_URL}/colors`)
    .then(res => res.json())
    .then(data => updateColors(data))
    }
  }, [])

  useEffect(() => {
    if (translation === 'Hebrew') {
      setRtlSetup({ 'dir': 'rtl' })
    }
    else {
      setRtlSetup({ 'dir': 'ltr' })
    }
  }, [translation])

  useEffect(() => {
    if (!popupStatus) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/popup`)
        .then(res => res.json())
        .then(data => {
          setPopUpDatails(data)
        });
    }

  }, [])

  useEffect(() => {
    if (Object.keys(popUpDatails).length && !popupStatus) {
      setTimeout(() => {
        setPopModelShow(true);
        updatePopupStatus();
      }, popUpDatails.Interval * 1000);
    }
  }, [popUpDatails])

  const onClose = () => {
    setPopModelShow(false);
  }

  return (
    <div className={`hero ${translation === 'Hebrew' ? 'rtl-style' : ''}`} {...rtlSetup}>
      {
        translation && colors ? <Switch>
          
          <Route path="/" exact component={Custom} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/blog/:slug" component={SinglePost} />
          <Route path="/domain" exact component={Domain} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/login" exact component={UserLogin}/>
          <Route path="/domainregister" exact component={Register}/>

          <Route path="/dashboard" component={DashboardComponent}/>

          <Route path="/:id" component={Custom} />
        </Switch> : <Spinner />
      }

      {
        popModelShow ? <PopUp item={popUpDatails} onClose={onClose} /> : null
      }
      <Whatsapp />
    </div>
  );
}

const mapStateToProps = ({ pages, popup }) => ({
  translation: pages.translation,
  colors: pages.colors,
  popupStatus: popup.popupStatus
});

const mapDispatchToProps = dispatch => ({
  updatePagesData: (data) => dispatch(updatePagesData(data)),
  updateTranslation: (language) => dispatch(updateTranslation(language)),
  updatePopupStatus: () => dispatch(updatePopupStatus()),
  updateColors: (colors) => dispatch(updateColors(colors))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

