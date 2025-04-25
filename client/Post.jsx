import React from 'react';

const Post = ({ post, onBeep, onBoop, onDelete }) => {
  const isPremium = post.author?.premium;

  const premiumStyle = {
    color: '#FFD700',
    textShadow: '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px orange',
    fontWeight: 'bold',
  };

  return (
    <div className="post">
      <p>
        <strong style={isPremium ? premiumStyle : {}}>
          {isPremium ? '👑 ' : ''}
          {post.author?.username}
        </strong>: {post.content}
      </p>
      <p>
        Beeps: {post.beeps} | Boops: {post.boops}
        <button onClick={onBeep}>Beep</button>
        <button onClick={onBoop}>Boop</button>
        <button onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

export default Post;
