import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/PostForm.css'

function EditPost({ posts, onEditPost }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')

    // Find the post to edit
    const post = posts.find(p => p.id === id)

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContent(post.content || '')
            setImageUrl(post.imageUrl || '')
        } else {
            setError('Post not found')
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Post title is required')
            return
        }

        if (!post) {
            setError('Cannot edit: Post not found')
            return
        }

        const updatedPost = {
            ...post,
            title,
            content,
            imageUrl
        }

        onEditPost(updatedPost)
        navigate(`/posts/${id}`)
    }

    if (!post) {
        return <div className="not-found">Post not found</div>
    }

    return (
        <div className="post-form-container">
            <h2>Edit Anime Discussion</h2>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL (optional)</label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    {imageUrl && (
                        <div className="image-preview">
                            <img src={imageUrl} alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate(`/posts/${id}`)} className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost 