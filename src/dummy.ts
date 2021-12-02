export interface Match {
  matchId: number; // 매치 id
  registerTeamId: number; // 등록팀 id
  applyTeamId: number | null; // 수락완료 신청팀 id(nullable). null일 시 매칭 전
  sports: string;
  city: string;
  region: string;
  groundName: string;
  date: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  status: string;
  cost: number;
  detail: string;
  isCancelled: boolean;
  created_date: string;
  modified_date: string;

  // 수락 전 매치 신청한 팀 목록? -> 매치 신청팀 리스트 조회 API 사용
  // 참가 팀원은? 유저 매치 기록API
  // players: [userId, userId, userId]
}

export const match: Match = {
  matchId: 1,
  registerTeamId: 2,
  applyTeamId: null,
  sports: 'FOOTBALL',
  city: '서울시',
  region: '강남구',
  groundName: '서초대륭 체육관',
  date: '2021-12-23',
  startTime: '11:00',
  endTime: '15:00',
  ageGroup: '20s',
  status: '경기전',
  cost: 30000,
  detail: '3:3 빠른 매칭 초보환영#l2',
  isCancelled: false,
  created_date: '2021-12-01',
  modified_date: '2021-12-01',
};

const match2: Match = {
  matchId: 2,
  registerTeamId: 3,
  applyTeamId: null,
  sports: 'FOOTBALL',
  city: '서울시',
  region: '금천구',
  groundName: '유제두 체육관',
  date: '2021-12-02',
  startTime: '14:00',
  endTime: '17:00',
  ageGroup: '20s',
  status: '경기전',
  cost: 30000,
  detail: '3:3 빠른 매칭 초보환영#l2',
  isCancelled: false,
  created_date: '2021-12-01',
  modified_date: '2021-12-01',
};

export const matches: Match[] = [match, match2];
