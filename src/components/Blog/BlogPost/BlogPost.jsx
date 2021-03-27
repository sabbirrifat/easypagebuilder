import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FormattedText from "../../../hooks/FormattedText";

const BlogPost = ({
  slug,
  imgUrl,
  category,
  publishDate,
  item,
  translation,
}) => {
  const event = new Date(publishDate);

  const sortedDescription = (description) => {
    if(description.length > 220){
      return `${description.slice(0, 220)}...`
    }
    else{
      return description
    }
  }
  
  const [newDescription, setNewDescription] = useState("");

  const replaceLineBreak = (current) => {
    if(translation !== 'Hebrew'){
      const regex = /([A-Za-z])\w+/gi;
      const result = current.match(regex);
      return result.join(" ");
    }
    else {
      return current
    }
  };

  useEffect(() => {
    setNewDescription(sortedDescription(replaceLineBreak( item[`Description_${translation}`] )))
  }, [item, translation])

  

  return (
    <div className="margin-bottom-50">
      <div className="hoverbox-8">
        <a href={`/blog/${slug}`}>
          <img src={`${process.env.REACT_APP_BACKEND_URL}${imgUrl}`} alt="" />
        </a>
      </div>
      <div className="margin-top-30">
        <div className="d-flex justify-content-between margin-bottom-10">
          <div className="d-inline-flex">
            <a
              className="font-family-tertiary font-small font-weight-normal uppercase"
              href={`/blog/${slug}`}
            >
              {category.map((item, key) => {
                if (category.length - 1 === key) {
                  return `${item.Name}`;
                } else {
                  return `${item.Name},  `;
                }
              })}
            </a>
          </div>
          <div className="d-inline-flex">
            <span className="font-small">{event.toDateString()}</span>
          </div>
        </div>
        <h5>
          <a href={`/blog/${slug}`}><FormattedText objectName={item} extension="Title" /></a>
        </h5>
        <p href={`/blog/${slug}`}>{newDescription}</p>
        <div className="margin-top-20">
          <a className="button-text-1" href={`/blog/${slug}`}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
  });

export default connect(mapStateToProps)( BlogPost)
