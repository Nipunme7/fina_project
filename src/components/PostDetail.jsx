import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CommentList from './CommentList'
import '../styles/PostDetail.css'

function PostDetail({ posts, onUpvote, onAddComment, onDelete }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')

    // Find the post
    const post = posts.find(p => p.id === id)

    if (!post) {
        return <div className="post-not-found">Post not found!</div>
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        if (comment.trim()) {
            onAddComment(post.id, comment)
            setComment('')
        }
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDelete(post.id)
            navigate('/')
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="post-detail">
            <div className="post-navigation">
                <Link to="/" className="back-link">← Back to Feed</Link>
            </div>

            <div className="post-content">
                <h1 className="post-title">{post.title}</h1>

                <div className="post-meta">
                    <span className="post-date">Posted on {formatDate(post.createdAt)}</span>
                    <div className="post-actions">
                        <Link to={`/edit/${post.id}`} className="edit-button">Edit</Link>
                        <button onClick={handleDelete} className="delete-button">Delete</button>
                    </div>
                </div>

                {post.imageUrl && (
                    <div className="post-image">
                        <img src={post.imageUrl} alt={post.title} />
                    </div>
                )}

                <div className="post-body">
                    <p>{post.content}</p>
                </div>

                <div className="post-interaction">
                    <button onClick={() => onUpvote(post.id)} className="upvote-button">
                        ⬆️ Upvote ({post.upvotes})
                    </button>
                </div>
            </div>

            <div className="comments-section">
                <h2>Comments ({post.comments.length})</h2>

                <form onSubmit={handleSubmitComment} className="comment-form">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What are your thoughts on this?"
                        rows={3}
                        required
                    />
                    <button type="submit" className="submit-comment">Comment</button>
                </form>

                <CommentList comments={post.comments} />
            </div>
        </div>
    )
}

export default PostDetail 