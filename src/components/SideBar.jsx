import React from 'react'


function SideBar({suggestions, handleSelectSuggestion}) {

  return (
    <div className="sidebar">
        <div className="sidebarItem">
      <span className="sidebarTitle">CATEGORIES</span>
      <ul className="sidebarList">
        
      {suggestions.map((suggestion) => (
          <li
          className="sidebarListItem"
            key={suggestion}
            onClick={() => handleSelectSuggestion(suggestion)}
          >
            {suggestion}
          </li>
        ))}
        <li className="sidebarListItem" onClick={() => handleSelectSuggestion('All')}>All</li>
        
      </ul>
    </div>
    <div className="sidebarItem">
      <span className="sidebarTitle">Ignite Your Imagination</span>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/travel-blog-d3700.appspot.com/o/images%2Fblog-main.png?alt=media&token=80f8f48c-ae5f-4d7f-8ab6-788912a564ad"
        alt=""
      />
      <p>
      Welcome to the versatile blog platform! Here, you have the freedom to write about anything that inspires you. Whether you want to share your thoughts on a specific topic, showcase your expertise, or express your creativity, our platform is the perfect place to unleash your ideas.
      </p>
      
    </div>
  
  </div>
  )
}

export default SideBar
