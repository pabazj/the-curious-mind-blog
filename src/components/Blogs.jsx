import React, { useEffect, useState } from 'react'
import { getDocs, deleteDoc, doc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import './components.css'
import { Link } from 'react-router-dom'
import { dateTime } from '../utils/DateTime'
import { AiOutlineDelete } from 'react-icons/ai';


function Blogs({ blogList, handleDeleteBlog }) {

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <div className="posts">
      {blogList.map(blog => (

        <div className="post" key={blog.id}>

          <div className="imageContainer">
            <img className="postImg" src={blog.image} alt="" />
            <span className="topLabel">{blog.category}</span>
            {isAuthenticated && blog.author.id === auth.currentUser.uid && <span className="bottomLabel"><AiOutlineDelete className="deleteIcon" size={25} onClick={() => { handleDeleteBlog(blog.id) }}/></span>}
          </div>
          <div className="postInfo">
            <span className="postDate"> {dateTime(blog.createdAt)} | {blog.author?.name} </span>
            <span className="postTitle">
              {blog.title}
            </span>

          </div>
          <p className="postDesc">
            {blog.blogContent}
          </p>
          <span className="articleReadMore">
            <Link
              className="readMore"
              to="/viewBlog"
              state={{ data: blog }}
            >
              Continue Reading
            </Link>
          </span>
        </div>
      ))}


    </div>
  )
}

export default Blogs
