import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/PostForm.css'

function CreatePost({ onAddPost }) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Post title is required')
            return
        }

        const newPost = {
            title,
            content,
            imageUrl: imageUrl || ''
        }

        onAddPost(newPost)
        navigate('/')
    }

    return (
        <div className="post-form-container">
            <h2>Create New Anime Discussion</h2>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What's your anime discussion about?"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your thoughts, theories, or questions about the anime..."
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
                        placeholder="https://example.com/your-anime-image.jpg"
                    />
                    {imageUrl && (
                        <div className="image-preview">
                            <img src={imageUrl} alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost 