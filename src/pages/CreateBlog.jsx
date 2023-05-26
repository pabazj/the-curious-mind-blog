import React , { useState}from 'react'
import {addDoc, collection} from "firebase/firestore"
import { db, auth, timeStamp } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import useStorage from '../customHooks/useStorage'
import './pages.css'
import Autocomplete from '../utils/AutoComplete'

const TYPES = ['image/png', 'image/jpg', 'image/jpeg']

function CreateBlog() {
    const [title, setTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')

    const blogCollectionRef = collection(db, "blogs")
    const navigate = useNavigate()
    const {imageUrl,uplodingProgress} = useStorage(file)

    const handleImageSubmit = (e) => {
        let imageData = e.target.files[0]
     
        if(imageData && TYPES.includes(imageData.type)) {
            setError(null)
            setFile(imageData)
        }
        else {
            setFile(null) 
            setError("Plase select an image (png, jpg or jpeg)")
        }
       
    }

    const handleTextareaChange = (e) => {
        setBlogContent(e.target.value);
      };
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setBlogContent((prevValue) => prevValue + '\n\n');
          }
      };

    const handleSubmit =(e) => {
        e.preventDefault()
      
        createBlogs()
    }

    const handleSelectCategory = (category) => {
      setSelectedCategory(category);
    };

    const createBlogs = async() => {
        await addDoc(blogCollectionRef, {
             title,
             blogContent,
             author: {
                id:auth.currentUser.uid,
                name: auth.currentUser.displayName 
             },
             image: imageUrl,
             createdAt: timeStamp,
             category: selectedCategory
        } )
        navigate("/")
    }

  return (

    <div className="write">
        { imageUrl && file != null &&
        <div className='writeImgContainer' ><img
        className="writeImg"
        src={imageUrl}
        alt=""
      /> 
      </div>
      }
     
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroupFileUpload">
          <label htmlFor="fileInput">
            <span className="writeIcon fas fa-plus">+</span>
          </label>
          <input 
          id="fileInput" 
          type="file" 
          style={{ display: "none" }}
          onChange={handleImageSubmit} 
          />
          <div className='error'>{error}</div>
        </div>
        <div className="writeFormGroup">
        <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="searchType">
        <Autocomplete onSelectCategory={handleSelectCategory}/>
        </div>
        
        <div className="writeFormGroup textAreaOutput">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            value={blogContent} 
            onChange={handleTextareaChange }
            onKeyDown={handleKeyPress}
          />
         
        </div>
        <button className="writeSubmit" type="submit" disabled={uplodingProgress < 100}>
          Publish
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
