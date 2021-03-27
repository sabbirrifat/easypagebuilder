import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { connect } from "react-redux";
import FormattedText from "../../hooks/FormattedText";

const FAQ = ({ values, translation }) => {
  return (
    <div className="section-lg">
      <div className="container">
        <div className="row col-spacing-50">
          <div className="col-md-6 col-lg-6">
            <h2>{ translation === 'Hebrew' ? 'אירוח אתרים' : 'Web Hosting'} </h2>
            {values.length ? (
              <Accordion>
                {values.map((item, key) => {
                    if(item.Web_Hosting){
                      return  <AccordionItem key={key}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {
                            <FormattedText
                              objectName={item}
                              extension="Question"
                            />
                          }
                          ?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          <FormattedText objectName={item} extension="Answer" />
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    }
                })}
              </Accordion>
            ) : null}
          </div>
          <div className="col-md-6 col-lg-6">
            <h2>{ translation === 'Hebrew' ? 'שירותי ענן' : 'Cloud Services'} </h2>
            {values.length ? (
              <Accordion>
                {values.map((item, key) => {
                    if(item.Cloud_Services){
                      return  <AccordionItem key={key}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {
                            <FormattedText
                              objectName={item}
                              extension="Question"
                            />
                          }
                          ?
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          <FormattedText objectName={item} extension="Answer" />
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    }
                })}
              </Accordion>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(FAQ);
