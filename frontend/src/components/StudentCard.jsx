import React, { useState } from 'react';

function StudentCard( { name, course } ) {
  const [likes, setLikes] = useState(0);

  const increaseLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Course: {course}</p>
      <h3>Likes: {likes}</h3>
      <button onClick={increaseLike}>Like</button>
    </div>
  );
}

export default StudentCard;
