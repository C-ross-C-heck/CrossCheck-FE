import React, { useState } from "react";
import "../css/posting.css";
import Sidebar from "../../Sidebar/components/Sidebar";
import { useNavigate } from "react-router-dom";

const Posting = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 동작(페이지 새로고침) 방지

    // 사용자 입력 데이터
    const userId ="hyundo"; //sessionStorage.getItem('currentUserId');
    const c_name = "free"; //sessionStorage.getItem('currentCName');
    const image = "NULL"; // 이미지가 없을 경우 NULL로 설정

    const postData = {
      userId,
      c_name,
      title,
      image,
      content,
    };

    try {
      const response = await fetch('https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/write_post', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.body); // 서버로부터의 응답 메시지 표시
      navigate("/Community"); // CommunityBoard.jsx로 이동
    } catch (error) {
      console.error('Error posting data:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="posting">
      <Sidebar />
      <div className="posting-container">
        <form className="posting-form" onSubmit={handleSubmit}>
          {/* 제목 */}
          <div className="form-group">
            <label htmlFor="title" className="label">
              제목
            </label>
            <input
              type="text"
              id="title"
              className="input"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
              required
            />
          </div>
          {/* 내용 */}
          <div className="form-group">
            <label htmlFor="content" className="label">
              내용
            </label>
            <textarea
              id="content"
              className="textarea"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)} // 내용 상태 업데이트
              required
            ></textarea>
          </div>

          <button type="submit" className="posting-submit-button">
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Posting;
