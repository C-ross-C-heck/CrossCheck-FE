// src/services/claudeService.js
import { CLAUDE_API_KEY } from '../config/keys';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

export const sendMessageToClaude = async (messages) => {
  try {
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLAUDE_API_KEY}`,  // x-api-key 대신 Bearer 토큰 사용
        'anthropic-version': '2024-02-15-preview',
        'x-api-key': CLAUDE_API_KEY
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `당신은 전문적인 부동산 사기 예방 도우미입니다. 다음과 같은 역할을 수행합니다:
            1. 부동산 거래 문서와 거래 과정을 검증합니다
            2. 임대 사기의 잠재적 위험 신호를 식별합니다
            3. 적절한 검증 절차를 안내합니다
            4. 법적 요구사항과 필요 서류에 대해 명확히 설명합니다
            5. 전문적이고 공식적인 톤을 유지하면서 도움이 되는 명확한 조언을 제공합니다
            
            문서나 정보를 분석할 때:
            - 제공된 정보의 일관성을 항상 확인합니다
            - 일반적인 사기 패턴을 체크합니다
            - 구체적이고 실행 가능한 조언을 제공합니다
            - 특정 문서나 검증이 왜 중요한지 설명합니다
            
            한국어로 응답해주세요.`
          },
          ...messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API Error:', errorData);
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Claude API Response:', data); // 응답 로깅
    
    // 응답 구조에 따라 적절한 필드 반환
    return data.content[0].text || data.content || '응답을 처리할 수 없습니다.';
  } catch (error) {
    console.error('Error in sendMessageToClaude:', error);
    throw new Error(`Claude API Error: ${error.message}`);
  }
};