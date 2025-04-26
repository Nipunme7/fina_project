import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import PostFeed from './components/PostFeed'
import PostDetail from './components/PostDetail'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'

// Theme Context
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts')
    return savedPosts ? JSON.parse(savedPosts) : []
  })

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  // Add a new post
  const addPost = (newPost) => {
    setPosts([...posts, {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: []
    }])
  }

  // Edit a post
  const editPost = (updatedPost) => {
    setPosts(posts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    ))
  }

  // Delete a post
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  // Upvote a post
  const upvotePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ))
  }

  // Add a comment to a post
  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now().toString(),
            text: comment,
            createdAt: new Date().toISOString()
          }]
        }
      }
      return post
    }))
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="anime-forum">
          <Navbar />
          <main className="content">
            <Routes>
              <Route
                path="/"
                element={<PostFeed posts={posts} />}
              />
              <Route
                path="/posts/:id"
                element={
                  <PostDetail
                    posts={posts}
                    onUpvote={upvotePost}
                    onAddComment={addComment}
                    onDelete={deletePost}
                  />
                }
              />
              <Route
                path="/new"
                element={<CreatePost onAddPost={addPost} />}
              />
              <Route
                path="/edit/:id"
                element={<EditPost posts={posts} onEditPost={editPost} />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
