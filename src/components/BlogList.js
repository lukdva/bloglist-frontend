import Blog from './Blog'

const BlogList = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>{props.user.name} logged in</p>
            {props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
      </div>
    )
}

export default BlogList