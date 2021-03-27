import React, { useEffect, useState } from "react";
import BlogHeader from "./BlogHeader/BlogHeader";
import BlogPost from "./BlogPost/BlogPost";
import Pagination from "./Pagination/Pagination";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Spinner from "../Spinner/Spinner";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {" "}
      {posts.length ? (
        <>
          <Header />
          <BlogHeader />
          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
                  {/* Blog Posts */}
                  {currentPosts.length
                    ? currentPosts.map((item, key) => (
                        <BlogPost
                          key={key}
                          item={item}
                          slug={item.Slug}
                          category={item.categories}
                          imgUrl={item.Image.url}
                          publishDate={item.Custom_Date ? item.Custom_Date : item.updated_at}
                        />
                      ))
                    : null}
                  <Pagination
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Blog;
