import React, { useState } from "react";
import { Heart, Share } from "lucide-react";
import { useParams } from "react-router-dom";
import "../css/postdetail.css";

import Sidebar from "../../Sidebar/components/Sidebar";

const currentUser = {
      id: 1,
      name: "Me",
};
const posts = [
      {
        id: 1,
        number: "01",
        title: "집 계약할 때 무엇을 먼저 봐야하나요?",
        writer: "집돌이",
        date: "2024.11.02",
        views: 112,
        likes: 30,
        content: `
            계약 전 필수 확인사항
          - 등기부등본 확인 소유권, 근저당권, 가압류 등 권리관계 파악
          - 건축물대장 확인 불법 증축이나 용도변경 여부 확인
          - 실제 소유자와 계약자 동일 여부 확인 (신분증 대조)
          - 중개사 자격증 및 사무소 등록증 확인
    
           계약서 작성 시 중요사항
          - 계약금, 중도금, 잔금 지급 일정과 금액
          - 정확한 주소와 면적 (전용면적/공용면적)
          - 등기이전 비용 부담 주체
          - 각종 관리비, 수도/전기 등 미납금 정산 방법
          - 계약 해제 조건과 위약금 규정
          - 인도 조건과 시기
          - 하자보수 책임 관련 사항
        `,
        comments: [
          {
            id: 1,
            user: "현도",
            comment: "정말 유용한 정보네요!",
            replies: [
              { id: 1, user: "은서", comment: "저도 그렇게 생각해요!" },
            ],
          },
        ],
      },
      {
        id: 2,
        number: "02",
        title: "전세 사기 예방 체크리스트",
        writer: "전세보호센터",
        date: "2024.10.28",
        views: 298,
        likes: 45,
        content: `
           전세 사기를 피하기 위한 체크리스트
          - 전세금 보호를 위한 보증보험 가입 확인
          - 주변 시세 대비 과도하게 낮은 전세금 주의
          - 계약 시 공인중개사와 동행
          - 등기부등본 상 근저당 설정 여부 확인
          - 임대인이 다수의 소유주인지 확인하여 부실 가능성 점검
          - 임대인의 세금 체납 확인
        `,
        comments: [
          {
            id: 1,
            user: "초보자",
            comment: "보증보험은 꼭 필요한가요?",
            replies: [
              { id: 1, user: "전문가", comment: "네, 예상치 못한 사기에서 보호받을 수 있습니다!" },
            ],
          },
        ],
      },
      {
        id: 3,
        number: "03",
        title: "집주인이 계약 취소를 통보했어요ㅠㅠ",
        writer: "슬픈 세입자",
        date: "2024.10.25",
        views: 421,
        likes: 67,
        content: `
           계약 취소 상황 대처법
          - 계약금 반환 요구: 계약서 상 위약금 조건 확인
          - 소송 필요 여부 판단: 임대인 의무 불이행 시 법적 대응 가능
          - 공인중개사와 논의 후 추가 협상 가능성 점검
        `,
        comments: [],
      },
      {
        id: 4,
        number: "04",
        title: "부동산 중개수수료 협상 꿀팁",
        writer: "도미야",
        date: "2024.10.20",
        views: 350,
        likes: 20,
        content: `
           중개수수료 협상 팁
          - 시세보다 높은 수수료 제안 시 협의 가능
          - 거래 금액에 따른 최대 한도 체크
          - 다양한 중개업체 비교 후 적정 비용 확인
        `,
        comments: [],
      },
      {
        id: 5,
        number: "05",
        title: "전세자금 대출 심사 얼마나 걸리나요?",
        writer: "하우스",
        date: "2024.10.18",
        views: 202,
        likes: 15,
        content: `
           대출 심사 기간과 절차
          - 일반적으로 2~5일 소요
          - 소득 증빙 서류, 계약서 등 필수 서류 준비
          - 추가 심사 필요 시 더 길어질 수 있음
        `,
        comments: [],
      },
      {
        id: 6,
        number: "06",
        title: "집 계약 전에 확인해야 할 세금 문제",
        writer: "세금박사",
        date: "2024.10.15",
        views: 198,
        likes: 22,
        content: `
           세금 문제 사전 확인
          - 집주인의 재산세, 종합부동산세 체납 여부 확인
          - 계약 시 양도소득세 발생 가능성 점검
          - 전세 계약 종료 시 세입자 보증금 보호를 위한 임대인의 소득세 신고 여부
        `,
        comments: [
          {
            id: 1,
            user: "궁금이",
            comment: "세금 체납은 어디서 확인하나요?",
            replies: [
              { id: 1, user: "세금박사", comment: "등기부등본 확인 시 관련 내용이 나옵니다!" },
            ],
          },
        ],
      },

      {
            id: 7,
            number: "07",
            title: "신축 아파트 하자보수 기간은 어떻게 되나요?",
            writer: "내 집",
            date: "2024.10.16",
            views: 257,
            likes: 14,
            comments: [
              {
                id: 1,
                user: "궁금이",
                comment: "하자보수 기간은 일반적으로 얼마나 되나요?",
                replies: [
                  { id: 1, user: "내 집", comment: "보통 2년에서 5년 사이입니다." },
                ],
              },
            ],
            content: `
               신축 아파트 하자보수 기간 안내
              - 일반 하자 입주 후 2년
              - 구조적 하자 입주 후 10년
              - 하자보수 신청 시 반드시 사진 및 내용을 기록하여 관리사무소에 제출
            `,
          },
          {
            id: 8,
            number: "08",
            title: "집주인이 갑자기 계약 취소하자고 하네요ㅠㅠ",
            writer: "집순이",
            date: "2024.10.02",
            views: 184,
            likes: 40,
            comments: [
              {
                id: 1,
                user: "피해자",
                comment: "이런 상황에서 어떻게 해야 하나요?",
                replies: [
                  { id: 1, user: "집순이", comment: "계약서에 명시된 위약금을 확인하세요." },
                  { id: 1, user: "전문가", comment: "온라인 법률 상담 받아보세요." },

                ],
              },
            ],
            content: `
               계약 취소 시 대처 방법
              - 계약서에 명시된 위약금 조항 확인
              - 등기부등본 상 권리 관계를 다시 검토
              - 공인중개사를 통해 임대인과 추가 협상 진행
            `,
          },
          {
            id: 9,
            number: "09",
            title: "임대차 계약 시 보증보험은 꼭 필요한가요?",
            writer: "안심이",
            date: "2024.09.29",
            views: 206,
            likes: 25,
            comments: [
              {
                id: 1,
                user: "세입자",
                comment: "보증보험이 어떤 경우에 유용한가요?",
                replies: [
                  { id: 1, user: "안심이", comment: "임대인의 파산이나 이중계약 상황에서 보증금을 보호받을 수 있습니다." },
                ],
              },
            ],
            content: `
               임대차 계약 시 보증보험의 중요성
              - 보증보험의 주요 장점
                - 임대인의 재정 상태 악화 시 보증금 보호
                - 계약 종료 후 보증금 반환이 지연될 경우 보상
              - 가입 방법
                - 계약서 작성 후 보증보험사에 직접 신청
                - 임대차 계약서를 필수로 제출
            `,
          },
          {
            id: 10,
            number: "10",
            title: "전세 계약 후 등기부등본 확인, 왜 중요한가요?",
            writer: "등기왕",
            date: "2024.09.15",
            views: 312,
            likes: 28,
            comments: [
              {
                id: 1,
                user: "초보자",
                comment: "등기부등본은 어디서 발급받을 수 있나요?",
                replies: [
                  { id: 1, user: "등기왕", comment: "대법원 인터넷 등기소에서 발급받을 수 있습니다." },
                ],
              },
            ],
            content: `
               전세 계약 후 등기부등본 확인의 중요성
              - 등기부등본 확인 이유
                - 새로운 근저당 설정 여부 확인
                - 소유권 변동 사항 확인
              - 확인 시점
                - 계약 후 즉시 등기부등본 발급
                - 임대차 계약서 작성 후 정기적으로 확인
            `,
          },
    ];
    

    const PostDetail = () => {
      const { id } = useParams();
      const post = posts.find((p) => p.id === parseInt(id));
      const [likes, setLikes] = useState(post ? post.likes : 0);
      const [liked, setLiked] = useState(false); // 좋아요 상태를 관리
      const [comments, setComments] = useState(post ? post.comments : []);
      const [commentInput, setCommentInput] = useState("");
      const [replyInput, setReplyInput] = useState("");
      const [replyTo, setReplyTo] = useState(null);

      if (!post) {
            return <div>해당 게시물을 찾을 수 없습니다.</div>;
      }

      const handleLike = () => {
            if (liked) {
                  setLikes(likes - 1); // 이미 좋아요 누른 상태면 감소
            } else {
                  setLikes(likes + 1); // 좋아요 안 누른 상태면 증가
            }
            setLiked(!liked); // 좋아요 상태 토글
      };

      const handleAddComment = (e) => {
            e.preventDefault();
            if (!commentInput.trim()) return;
            const newComment = {
                  id: Date.now(),
                  user: currentUser.name,
                  comment: commentInput,
                  replies: [],
            };
            setComments([...comments, newComment]);
            setCommentInput("");
      };

      const handleAddReply = (e, commentId) => {
            e.preventDefault();
            if (!replyInput.trim()) return;
            const updatedComments = comments.map((comment) => {
                  if (comment.id === commentId) {
                        return {
                              ...comment,
                              replies: [
                                    ...comment.replies,
                                    { id: Date.now(), user: currentUser.name, comment: replyInput },
                              ],
                        };
                  }
                  return comment;
            });
            setComments(updatedComments);
            setReplyInput("");
            setReplyTo(null);
      };

      const handleDeleteComment = (commentId) => {
            const updatedComments = comments.filter((comment) => comment.id !== commentId);
            setComments(updatedComments);
      };

      const handleDeleteReply = (commentId, replyId) => {
            const updatedComments = comments.map((comment) => {
                  if (comment.id === commentId) {
                        return {
                              ...comment,
                              replies: comment.replies.filter((reply) => reply.id !== replyId),
                        };
                  }
                  return comment;
            });
            setComments(updatedComments);
      };

      return (
            <div className="frame">
                  <Sidebar />

                  {/* Title */}
                  <div className="title-container">
                        <h1 className="text-wrapper">{post.title}</h1>
                        <div className="action-buttons">
                              <button onClick={handleLike} className="heart-button">
                                    <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill={liked ? "#FF8FAB" : "none"} // 좋아요 상태에 따라 색상 변경
                                          stroke="#FF8FAB"
                                          strokeWidth="2"
                                    >
                                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                              </button>
                              <button className="share-button">
                                    <Share size={24} color="#FF8FAB" />
                              </button>
                        </div>
                  </div>

                  {/* Info Bar */}
                  <div className="navbar">
                        <div className="div">작성자: {post.writer}</div>
                        <div className="text-wrapper-4">작성일: {post.date}</div>
                        <div className="text-wrapper-3">조회수: {post.views}</div>
                        <div className="text-wrapper-2">좋아요: {likes}</div>
                  </div>

                  {/* Content Title */}
                  <div className="text-wrapper-6">
                        내용
                  </div>

                  {/* Main Content */}
                  <div className="overlap">
                        <p className="p">
                              {post.content.split('\n').map((line, index) => (
                                    <span key={index} className={line.startsWith('•') ? 'text-wrapper-5' : 'span'}>
                                          {line}
                                          <br />
                                    </span>
                              ))}
                        </p>
                  </div>

                  {/* Comments Section */}
                  <div className="text-wrapper-7">댓글</div>

                  {/* Comments */}
                  <div className="comments-container">
                        {comments.map((comment) => (
                              <div key={comment.id} className="div-2">
                                    <div className="comment-content">
                                          <span className="text-wrapper-10">{comment.user}</span>
                                          <span className="text-wrapper-11"> : {comment.comment}</span>
                                    </div>

                                    <div className="comment-actions">
                                          <button
                                                className="delete-button"
                                                onClick={() => handleDeleteComment(comment.id)}
                                          >
                                                삭제
                                          </button>
                                          <button
                                                className="reply-button"
                                                onClick={() => setReplyTo(comment.id)}
                                          >
                                                답글
                                          </button>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies.map((reply) => (
                                          <div key={reply.id} className="div-3">
                                                <div className="comment-content">
                                                      <span className="text-wrapper-10">{reply.user}</span>
                                                      <span className="text-wrapper-11"> : {reply.comment}</span>
                                                </div>
                                                <div className="comment-actions">
                                                      <button
                                                            className="delete-button"
                                                            onClick={() => handleDeleteReply(comment.id, reply.id)}
                                                      >
                                                            삭제
                                                      </button>
                                                </div>
                                          </div>
                                    ))}

                                    {/* Reply Form */}
                                    {replyTo === comment.id && (
                                          <form
                                                className="reply-form"
                                                onSubmit={(e) => handleAddReply(e, comment.id)}
                                          >
                                                <input
                                                      type="text"
                                                      value={replyInput}
                                                      onChange={(e) => setReplyInput(e.target.value)}
                                                      placeholder="답글 작성하기"
                                                />
                                                <button type="submit">답글 추가</button>
                                          </form>
                                    )}
                              </div>
                        ))}
                  </div>

                  {/* Comment Form */}
                  <div className="group">
                        <form onSubmit={handleAddComment} className="comment-form">
                              <input
                                    type="text"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder="댓글 작성하기..."
                                    className="comment-input"
                              />
                              <button type="submit" className="submit-button">
                                    보내기
                              </button>
                        </form>
                  </div>
            </div>
      );
};

export default PostDetail;
