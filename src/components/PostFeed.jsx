import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/PostFeed.css'

function PostFeed({ posts }) {
    const [sortBy, setSortBy] = useState('newest') // or 'top'
    const [searchQuery, setSearchQuery] = useState('')

    // Sort and filter posts
    const filteredPosts = posts
        .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt)
            } else {
                return b.upvotes - a.upvotes
            }
        })

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className="post-feed">
            <div className="feed-header">
                <h1>Anime Discussions</h1>
                <div className="feed-controls">
                    <div className="sort-controls">
                        <span>Sort by:</span>
                        <button
                            className={sortBy === 'newest' ? 'active' : ''}
                            onClick={() => setSortBy('newest')}
                        >
                            Newest
                        </button>
                        <button
                            className={sortBy === 'top' ? 'active' : ''}
                            onClick={() => setSortBy('top')}
                        >
                            Top
                        </button>
                    </div>
                    <div className="search-controls">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="posts-container">
                {filteredPosts.length === 0 ? (
                    <div className="no-posts">
                        <p>No posts found. Be the first to start a discussion!</p>
                        <Link to="/new" className="create-first-post">Create Post</Link>
                    </div>
                ) : (
                    filteredPosts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-votes">
                                <span>{post.upvotes}</span>
                            </div>
                            <div className="post-content">
                                <h2 className="post-title">
                                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                                </h2>
                                {post.imageUrl && (
                                    <div className="post-thumbnail">
                                        <img src={post.imageUrl} alt={post.title} />
                                    </div>
                                )}
                                <div className="post-meta">
                                    <span className="post-date">{formatDate(post.createdAt)}</span>
                                    <span className="post-comments">{post.comments.length} comments</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default PostFeed 