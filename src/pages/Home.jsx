import React, {useEffect, useState} from 'react'
import {getDocs, deleteDoc, doc, collection, query, orderBy} from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import Blogs from '../components/Blogs'
import SideBar from '../components/SideBar'
import './pages.css'

const posts = [
    {
        id: '1',
        title: 'test',
        blogContent: [
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
            "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
            "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
          ],
        image: '	https://www.srilanka.travel/image/travel-new-images/elephant-new.png'
    },
    {
        id: '2',
        title: 'test two',
        blogContent: 'ggggggggggggggggggggggggggggggggggggggggggg',
        image: '	https://www.srilanka.travel/image/travel-new-images/elephant-new.png'
    },
    {
        id: '3',
        title: 'test three',
        blogContent: 'ggggggggggggggggggggggggggggggggggggggggggg',
        image: '	https://www.srilanka.travel/image/travel-new-images/elephant-new.png'
    }
]

const suggestions = ['Technology', 'Travel', 'Food', 'Art', 'Social'];

function Home({isAuthenticated}) {

    const [blogList, setBlogList] = useState([])
    const [dataFetched, setDataFetched] = useState(false);
    const [filteredBlogList, setFilteredBlogList] = useState([]);

    // const blogCollectionRef = collection(db, "blogs")
    const blogCollectionRef = query(collection(db, "blogs"), orderBy("createdAt", "desc"));


    useEffect(() => {
        if (!dataFetched) {
          getBlogs();
        // setBlogList(posts)
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
