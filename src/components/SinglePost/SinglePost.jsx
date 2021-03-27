import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import FormattedText from "../../hooks/FormattedText";
import Footer from "../Footer/Footer";
import Header from '../Header/Header';
import Spinner from "../Spinner/Spinner";

const SinglePost = ({translation}) => {
  const [postData, setPostData] = useState({});
  const { slug } = useParams();
  const [dateString, setDateString] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts?Slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data[0]);
        if(data[0].Custom_Date){
        setDateString(new Date(data[0].Custom_Date));
        }
        else{
          setDateString(new Date(data[0].updated_at));
        }
      });
  }, [slug]);

  const [description, setDescription] = useState("");

  const replaceLineBreak = (search, current) => {
    const substring = new RegExp(search, "gi");
    const result = current.replace(substring, `${process.env.REACT_APP_BACKEND_URL}/uploads`);
    return result;
  };

  useEffect(() => {
    if(Object.keys(postData).length){
      const searchTerm = "/uploads";
      setDescription(replaceLineBreak(searchTerm, postData[`Description_${translation}`] ));
    }
  }, [postData, translation]);
  

  return (
    <>
    
    {  Object.keys(postData).length ? <>
      <Header blackBack={true} />
        <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
              <h2 className="font-weight-normal">
                <FormattedText objectName={postData} extension="Title" />
                </h2>
              <ul className="list-inline-dash">
                <li>
                  <a href="#">by Admin</a>
                </li>
                <li>
                  
                  {postData.categories.length
                    ? postData.categories.map((item, key) => {
                        if (postData.categories.length - 1 === key) {
                          return `${item.Name}`
                        } else {
                          return `${item.Name},  `;
                        }
                      })
                    : null}
                </li>
                <li>
                  <a href="#">{dateString ? dateString.toDateString() : ""}</a>
                </li>
              </ul>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* Featured Image */}
      <div className="container">
        <img src={`${process.env.REACT_APP_BACKEND_URL}${postData.Image.url}`} alt="" />
      </div>
      {/* end container */}
      {/* end Featured Image */}
      {/* Post Content */}
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
         
        </div>
        
      </div> 
      <Footer />
      </> : <Spinner />
    }
    </>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)( SinglePost);
