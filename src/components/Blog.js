import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog, updateBlogList, user, removeBlogFromList}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visibleDetails, setVisibleDetails] = useState(false);
  const toggleVisibility = () => {
    setVisibleDetails(!visibleDetails);
  }
  const handleLikeClick = async () => { 
    const response = await blogService.increaseLikes(blog);
    console.log(response);
    updateBlogList(response);
  }
  const handleRemoveClick = async () => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author}`))
    {
      await blogService.removeBlog(blog);
      removeBlogFromList(blog);
    }
  }

  return (
  <div style = {blogStyle}>
    <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>{visibleDetails ? 'hide' : 'view'}</button> </div>
    <div style={ {display: visibleDetails? '' : 'none'} }>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={handleLikeClick}>like</button> </div>
      <div>{blog.user ? blog.user.name : ''}</div>
      {blog.user.username === user.username && <button onClick={handleRemoveClick}>remove</button>}
    </div>
  </div> 
  )
}

export default Blog