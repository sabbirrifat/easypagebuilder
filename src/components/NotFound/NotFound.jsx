import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const NotFound = () => {
    return (
        <>
            <Header />
                <div class="section-xl bg-image parallax" data-bg-src="./404-classic-bg.jpg">
                    <div class="bg-black-03">
                        <div class="container text-center">
                            <div class="row">
                                <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <h1 class="display-2 font-weight-light">404</h1>
                                    <h5 class="font-weight-light text-light">Sorry, It appears that the page you were looking for doesn't exist or might have been moved.</h5>
                                    <a class="button button-xl button-radius button-dark margin-top-30" href="/">Go Home Page</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default NotFound
