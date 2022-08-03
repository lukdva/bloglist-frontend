import Blog from './Blog'
import UserInfo from './UserInfo'


const BlogList = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            <UserInfo setUser={props.setUser} user={props.user} />
            {props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
      </div>
    )
}

export default BlogList