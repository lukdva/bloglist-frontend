import Blog from './Blog'

const BlogList = ({blogs, user, setUser, setBlogs}) => {

    const updateBlogList = (updatedBlog) => {
        const updatedBlogList = blogs.map(blog => { return blog.id == updatedBlog.id ? updatedBlog : blog })
        setBlogs(updatedBlogList);
    }
    
    return (
        <div>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlogList={updateBlogList} />
            )}
      </div>
    )
}

export default BlogList
