import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar/components/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../css/history.css';

const History = () => {
  const navigate = useNavigate();
  const [chatHistories, setChatHistories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChatHistories = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/getHistory?userId=${userId}`, {
          method: 'GET', // GET 메서드 사용
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setChatHistories(data); // 가져온 데이터 설정
      } catch (error) {
        console.error('Error fetching chat histories:', error);
      }
    };

    fetchChatHistories();
  }, []);
  
  const handleDeleteHistory = async (chatRoomId) => {
    try{
      const response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/del_history`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({chatRoomId}),
      });

      if(!response.ok){
        throw new Error('Failed to delete chat room');
      }

      alert('채팅방이 삭제 되었습니다!');
      setChatHistories((prevHistories)=> prevHistories.filter(chat=>chat.chatRoomId!==chatRoomId));
    } catch(error){
      console.error('Error delete chat room: ',error);
      alert('채팅방 삭제 중 오류 발생');
    }
  };

  const handleEditChat = (chatRoomId) => {
    navigate(`/chatbot/${chatRoomId}`);
  }

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      try {
        const userId = sessionStorage.getItem('userId');
        let response;
        if(searchTerm.trim()===""){
          // 검색어가 비어 있을 경우 전체 히스토리 요청
          response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/getHistory?userId=${userId}`, {
            method: 'GET', // GET 메서드 사용
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }
        else{
          response = await fetch(`https://qrwrsukdh4.execute-api.ap-northeast-2.amazonaws.com/search_chat_room`, { // Lambda 함수의 실제 URL 입력
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: searchTerm, userId }), // 요청 본문에 title과 userId 포함
          });

        }

  
        if (!response.ok) {
          throw new Error('Failed to fetch chat histories');
        }
  
        const data = await response.json();
        setChatHistories(data); // 검색된 데이터로 상태 업데이트
      }catch (error) {
        console.error('Error searching chat histories:', error);
        alert('채팅 기록 검색 중 오류가 발생했습니다.'); // 사용자에게 알림
        }
      }
    };

  return (
    <div className="history-container">
      <Sidebar />
      <main className="history-main">
        <div className="history-header">
          <h1>Your chat history.</h1>
          <button className="new-chat-button" onClick={() => navigate('/chatbot')}>
            + start a new chat
          </button>
        </div>

        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search your chat"
              className="search-input"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <div className="chat-history-list">
          {chatHistories.map((chat, index) => (
            <div key={index} className="chat-history-item">
              <div className="chat-info">
                <h3>{chat.title}</h3>
                <span>{chat.time}</span>
              </div>
              <div className="chat-actions">
                <button className="edit-button" onClick={()=>handleEditChat(chat.chatRoomId)}>✏️</button>
                <button className="delete-button" onClick={()=>handleDeleteHistory(chat.chatRoomId)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default History;
