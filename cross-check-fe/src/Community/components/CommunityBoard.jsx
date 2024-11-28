import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

const posts = [
  { 
    id: 1, 
    number: "01", 
    title: "집 계약할 때 무엇을 먼저 봐야 하나요?", 
    writer: "집돌이", 
    date: "2024.11.02", 
    views: 112, 
    likes: 30, 
    comments: 2 
  },
  { 
    id: 2, 
    number: "02", 
    title: "전세 사기 예방 체크리스트", 
    writer: "전세보호센터", 
    date: "2024.10.28", 
    views: 298, 
    likes: 45, 
    comments: 2 
  },
  { 
    id: 3, 
    number: "03", 
    title: "집주인이 계약 취소를 통보했어요ㅠㅠ", 
    writer: "슬픈 세입자", 
    date: "2024.10.25", 
    views: 421, 
    likes: 67, 
    comments: 0 
  },
  { 
    id: 4, 
    number: "04", 
    title: "부동산 중개수수료 협상 꿀팁", 
    writer: "도미야", 
    date: "2024.10.20", 
    views: 350, 
    likes: 20, 
    comments: 0 
  },
  { 
    id: 5, 
    number: "05", 
    title: "전세자금대출 심사 얼마나 걸리나요?", 
    writer: "하우스", 
    date: "2024.10.20", 
    views: 202, 
    likes: 15, 
    comments: 0 
  },
  { 
    id: 6, 
    number: "06", 
    title: "집 계약 전에 확인해야 할 세금 문제", 
    writer: "세금박사", 
    date: "22024.10.15", 
    views: 198, 
    likes: 22, 
    comments: 1 
  },
  { 
    id: 7, 
    number: "07", 
    title: "신축 아파트 하자보수 기간은 어떻게 되나요?", 
    writer: "내 집", 
    date: "2024.10.16", 
    views: 257, 
    likes: 14, 
    comments: 2 
  },
  { 
    id: 8, 
    number: "08", 
    title: "집주인이 갑자기 계약 취소하자고 하네요ㅠㅠ", 
    writer: "집순이", 
    date: "2024.10.02", 
    views: 184, 
    likes: 40, 
    comments: 3 
  },
  { 
    id: 9, 
    number: "09", 
    title: "임대차 계약 시 보증보험은 꼭 필요한가요?", 
    writer: "안심이", 
    date: "2024.09.29", 
    views: 206, 
    likes: 25, 
    comments: 2 
  },
  { 
    id: 10, 
    number: "10", 
    title: "전세 계약 후 등기부등본 확인, 왜 중요한가요?", 
    writer: "등기왕", 
    date: "2024.09.15", 
    views: 312, 
    likes: 28, 
    comments: 2 
  },
];
 

const CommunityBoard = () => {
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
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <div>{post.number}</div>
            <div className="post-title">{post.title}</div>
            <div>{post.writer}</div>
            <div>{post.date}</div>
            <div>{post.views}</div>
            <div>{post.likes}</div>
            <div>{post.comments}</div>
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
