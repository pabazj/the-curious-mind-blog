import React from 'react'
import { useLocation } from "react-router-dom";
import { dateTime } from '../utils/DateTime'

function Blog() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      <img
        className="singlePostImg"
        src={data?.image}
        alt=""
      />
      <h1 className="singlePostTitle">
      {data?.title}
        <div className="singlePostEdit">
          {/* <i className="singlePostIcon far fa-edit"> Edit</i> */}
          {/* <i className="singlePostIcon far fa-trash-alt">new</i> */}
        </div>
      </h1>
      <div className="singlePostInfo">
        <span>
          Author:
          <b className="singlePostAuthor">
             {data.author?.name}
          </b>
        </span>
        <span>{dateTime(data.createdAt)}</span>
      </div>
      <p className="singlePostDesc" style={{ whiteSpace: 'pre-wrap' }}>
       {data.blogContent}
      </p>
    </div>
  </div>
  )
}

export default Blog
