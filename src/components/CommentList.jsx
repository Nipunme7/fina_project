import '../styles/CommentList.css'

function CommentList({ comments }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (comments.length === 0) {
        return <div className="no-comments">No comments yet. Be the first to share your thoughts!</div>
    }

    return (
        <div className="comments-list">
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <span className="comment-author">Anonymous Fan</span>
                        <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                    <div className="comment-body">
                        <p>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentList 