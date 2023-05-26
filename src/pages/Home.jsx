import React, {useEffect, useState} from 'react'
import {getDocs, deleteDoc, doc, collection, query, orderBy} from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import Blogs from '../components/Blogs'
import SideBar from '../components/SideBar'
import './pages.css'

const suggestions = ['Technology', 'Travel', 'Food', 'Art', 'Social'];

function Home({isAuthenticated}) {

    const [blogList, setBlogList] = useState([])
    const [dataFetched, setDataFetched] = useState(false);
    const [filteredBlogList, setFilteredBlogList] = useState([]);

    const blogCollectionRef = query(collection(db, "blogs"), orderBy("createdAt", "desc"));


    useEffect(() => {
      
        if (!dataFetched) {
          getBlogs();   
          setDataFetched(true);
        }
      }, [dataFetched]);

  const getBlogs = async () => {

    const blogs = await getDocs(blogCollectionRef);
    const data = blogs.docs.map((item) => ({ ...item.data(), id: item.id }));
    setBlogList(data);
  }

    const handleDeleteBlog =async(id) => {
        const selectedBlog = doc(db, "blogs", id)
        await deleteDoc(selectedBlog)
        setBlogList((prevList) => prevList.filter((blog) => blog.id !== id));
    }

    const handleSelectSuggestion = (suggestion) => {
    
      const filteredItems = blogList.filter((item) => item.category === suggestion);
      setFilteredBlogList(filteredItems);
      
    };

  return (
    <div className="home">
    <Blogs 
        isAuthenticated={isAuthenticated} 
        blogList={filteredBlogList.length > 0 ? filteredBlogList : blogList} 
        handleDeleteBlog={handleDeleteBlog}
        />
        <SideBar suggestions={suggestions} handleSelectSuggestion={handleSelectSuggestion}/>
        </div>
  )
}

export default Home
