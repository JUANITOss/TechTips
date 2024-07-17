import React, { useState } from 'react';
import './PostForm.css';
import './PostSystem.css';
const PostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id='input-creador-post'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        id='textarea-creador-post'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button id='button-post-accept' type="submit">Submit</button>
    </form>
  );
};

export default PostForm;