import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

const CommunityBoard = ({posts}) => {
  const navigate = useNavigate();

  return (
    <div className="board-wrapper">
      {/* 테이블 형태로 게시판 구현 */}
      <div className="board-header">
        <div className="header-item">No.</div>
        <div className="header-item">Title</div>
        <div className="header-item">Writer</div>
        <div className="header-item">Date</div>
        <div className="header-item">Views</div>
        <div className="header-item">Likes</div>
        <div className="header-item">Comments</div>
      </div>

      <div className="board-contents">
        {posts.map((post) => (
          <div
            className="post-item"
            key={post.free_post_id}
            onClick={() => navigate(`/post/${post.free_post_id}`)}
          >
            <div>11</div>
            <div className="post-title">{post.title}</div>
            <div>{post.userId}</div>
            <div>{post.createdAt}</div>
            <div>{post.watched}</div>
            <div>{post.likes}</div>
            <div>{post.content}</div>
          </div>
        ))}
      </div>

      {/* 페이징 UI */}
      <div className="pagination">
        <img src={arrowLeft} alt="Previous" />
        <span>1</span>
        <img src={arrowRight} alt="Next" />
      </div>
    </div>
  );
};

export default CommunityBoard;
