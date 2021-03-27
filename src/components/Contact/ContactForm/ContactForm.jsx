import React, { useEffect, useState } from "react";
import FormattedText from "../../../hooks/FormattedText";

const ContactForm = ({values}) => {
  const [formId, setFormId] = useState('');


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/contact-form`)
      .then((res) => res.json())
      .then((data) => {
        setFormId(data.Form_Id);
      });
  }, []);

  const [status, setStatus] = useState('');


  const submitForm = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(data);
  }


  return (
    <div className="section" style={{paddingTop : '0'}}>
      <div className="container">
        {/* Contact Form */}
        <div className="margin-top-5 margin-lg-top-5">
          <div className="contact-form">
            <form id="contactform" onSubmit={submitForm}
              action={`https://formspree.io/f/${formId}`}
              method="POST">

              <div className="form-row">
                <div className="col-12 col-sm-6">
                  <input
                    className="border-radius-0375"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    className="border-radius-0375"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-Mail"
                    required
                  />
                </div>
              </div>
              <textarea
                className="border-radius-0375"
                name="message"
                id="message"
                placeholder="Message"
                defaultValue={""}
              />
              <button
                className="button button-lg button-radius button-outline-dark-2"
                type="submit"
              >
                <FormattedText objectName={values[0]} extension="Contact_Button_Text" />
              </button>
            </form>
            {/* Submit result */}
            <div className="submit-result">
              {
                status === 'SUCCESS' ? <span className={status ? 'show-result' : ''} id="success">Thank you! Your Message has been sent.</span> : null
              }

              {
                status === 'ERROR' ?  <span className={status ? 'show-result' : ''} id="error">Something went wrong, Please try again!</span> : null
              }
             
            </div>
          </div>
          {/* end contact-form */}
        </div>
        {/* end Contact Form */}
      </div>
      {/* end container */}
    </div>
  );
};

export default ContactForm;
