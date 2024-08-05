import React, { useState } from 'react';
import { FaRegComment } from 'react-icons/fa'; // Importing a comment icon from react-icons


const CommentButton = () => {
  const [showInput, setShowInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="comment-button">
      <FaRegComment className="comment-icon" onClick={toggleInput} />
      <span>{comments.length} comments</span>
      {showInput && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button type="submit" className="comment-submit">Post</button>
        </form>
      )}
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">{comment}</div>
        ))}
      </div>
    </div>
  );
};

export default CommentButton;
