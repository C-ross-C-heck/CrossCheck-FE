import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityBoard from './CommunityBoard';
import '../css/community.css';

const Community = () => {
  const [activeBoard, setActiveBoard] = useState('free'); // 'free' or 'fraud'
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // 상태로 게시물 관리
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 데이터 가져오기 함수
  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/get_community?c_name=${activeBoard}`); // API 엔드포인트 설정
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setPosts(data); // 가져온 데이터로 상태 업데이트
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };


  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <div className="community-container">
      <div className="community-content">
        <div className="board-tabs">
          <button
            className={`board-tab ${activeBoard === 'free' ? 'active' : ''}`}
            onClick={() => setActiveBoard('free')}
          >
            자유게시판
          </button>
          <button
            className={`board-tab ${activeBoard === 'scam' ? 'active' : ''}`}
            onClick={() => setActiveBoard('scam')}
          >
            전세사기 게시판
          </button>
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${activeBoard === 'free' ? '20px' : '180px'})`,
            }}
          />
        </div>
        <button className="write-btn" onClick={() => navigate('/Posting')}>
          <span>+</span>
          write
        </button>
        <CommunityBoard posts={posts}/> 
      </div>
    </div>
  );
};

export default Community;
