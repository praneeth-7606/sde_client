import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Importing a heart icon from react-icons
// import './LikeButton.css'; // Importing the CSS for styling

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100); // Initial like count

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1)); // Increase or decrease like count
  };

  return (
    <div className="like-button">
      <FaHeart 
        className={`heart-icon ${liked ? 'liked' : ''}`} 
        onClick={toggleLike} 
      />
      <p></p>
      <br></br>
      <span>{likeCount} likes</span>
    </div>
  );
};

export default LikeButton;
