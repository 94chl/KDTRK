export interface TeamUser {
  captainId?: number;
  captainName?: string;
  teamUserId?: number;
  teamUserName?: string;
}
export interface Team {
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  teamUsers: TeamUser[];

  // tagNames: string[];
  // captainId: number;
  // captainName: string;
  // ageGroup: string;
}

export interface Match {
  matchId: number;
  city: string;
  region: string;
  groundName: string;
  date: string;
  startTime: string;
  endTime: string;
  cost: number;
  ageGroup: string;
  detail?: string;
  homeTeam: Team;
  awayTeam?: Team;
  teamId?: number;
  teamLogo?: string;
  teamName?: string;
  teamMannerTemperature?: number;
  teamUsers?: TeamUser[];
  sports: string;
  status: string;
  // isCancelled: boolean;
  // created_date: string;
  // modified_date: string;
}

export interface Matches {
  data: {
    matches: Omit<Match, 'homeTeam'>[];
  };
}

export interface MatchDetail {
  data: Match;
}

export const matches: Matches = {
  data: {
    matches: [
      {
        matchId: 1,
        city: '서울특별시',
        region: '광진구',
        groundName: '어린이대공원풋살장',
        date: '2021-12-25',
        startTime: '10:30',
        endTime: '12:30',
        cost: 30000,
        ageGroup: '20s',
        teamLogo: 's3://aasdfasd',
        teamName: '데브코스',
        teamMannerTemperature: 36.1,
        sports: '축구',
        status: '매칭전',
      },
      {
        matchId: 2,
        city: '서울특별시',
        region: '광진구',
        groundName: '어린이대공원풋살장',
        date: '2021-12-25',
        startTime: '10:30',
        endTime: '12:30',
        cost: 30000,
        ageGroup: '20s',
        teamLogo: 's3://aasdfasd',
        teamName: '데브코스',
        teamMannerTemperature: 36.1,
        sports: '축구',
        status: '매칭전',
      },
    ],
  },
};

export const match: MatchDetail = {
  data: {
    matchId: 1,
    city: '서울특별시',
    region: '광진구',
    groundName: '어린이대공원풋살장',
    date: '2021-12-25',
    startTime: '10:30',
    endTime: '12:30',
    cost: 30000,
    ageGroup: '20s',
    sports: '풋살',
    detail: '어르신들환영',
    status: '매칭전',
    homeTeam: {
      teamId: 1,
      teamLogo: 's3://aasdfasd',
      teamName: '데브코스',
      teamMannerTemperature: 36.1,
      teamUsers: [
        {
          teamUserId: 1,
          teamUserName: '쭝',
        },
        {
          teamUserId: 2,
          teamUserName: '시즈',
        },
        {
          teamUserId: 3,
          teamUserName: '싸뮤엘',
        },
        {
          teamUserId: 4,
          teamUserName: '용스톤',
        },
        {
          teamUserId: 5,
          teamUserName: '체리',
        },
        {
          teamUserId: 6,
          teamUserName: '호세',
        },
      ],
    },
  },
};

export interface TeamSimple {
  teamId: number;
  teamName: string;
  teamUsers: TeamUser[];
}

export interface TeamWithUser {
  data: {
    teams: TeamSimple[];
  };
}

export const userTeam: TeamWithUser = {
  data: {
    teams: [
      {
        teamId: 1,
        teamName: '데브코스',
        teamUsers: [
          {
            teamUserId: 1,
            teamUserName: '쭝',
          },
          {
            teamUserId: 2,
            teamUserName: '호세',
          },
        ],
      },
      {
        teamId: 2,
        teamName: '머쓱',
        teamUsers: [
          {
            teamUserId: 11,
            teamUserName: '쭝쭝',
          },
          {
            teamUserId: 12,
            teamUserName: '세호',
          },
        ],
      },
      {
        teamId: 3,
        teamName: '포켓몬마스터',
        teamUsers: [
          {
            teamUserId: 123,
            teamUserName: '피카추',
          },
          {
            teamUserId: 124,
            teamUserName: '라이추',
          },
          {
            teamUserId: 125,
            teamUserName: '파이리',
          },
          {
            teamUserId: 126,
            teamUserName: '꼬부기',
          },
          {
            teamUserId: 127,
            teamUserName: '버터플',
          },
          {
            teamUserId: 128,
            teamUserName: '야도란',
          },
          {
            teamUserId: 129,
            teamUserName: '피존투',
          },
          {
            teamUserId: 130,
            teamUserName: '또가스',
          },
        ],
      },
    ],
  },
};

// 안쓰는듯?
export interface MatchTypes {
  data: {
    matches: Omit<Match, 'homeTeam'>[];
    match: Match[];
    userTeam: TeamSimple[];
  };
}

export interface WaitingTeam {
  teamWaitingId: number;
  teamId: number;
  teamLogo: string;
  teamName: string;
  teamMannerTemperature: number;
  teamUsers: TeamUser[];
}

export interface WaitingTeams {
  data: {
    waitingTeams: WaitingTeam[];
  };
}

export const WaitingTeamsDummy: WaitingTeams = {
  data: {
    waitingTeams: [
      {
        teamWaitingId: 3,
        teamId: 1,
        teamLogo: 's3://aasdfasd',
        teamName: 'DEVCOURSE',
        teamMannerTemperature: 36.1,
        teamUsers: [
          {
            teamUserId: 1,
            teamUserName: '쭝',
          },
          {
            teamUserId: 2,
            teamUserName: '시즈',
          },
          {
            teamUserId: 3,
            teamUserName: '싸뮤엘',
          },
          {
            teamUserId: 4,
            teamUserName: '용스톤',
          },
          {
            teamUserId: 5,
            teamUserName: '체리',
          },
          {
            teamUserId: 6,
            teamUserName: '호세',
          },
        ],
      },
      {
        teamWaitingId: 1,
        teamId: 2,
        teamLogo: 's3://aabbccdd',
        teamName: 'MUSSG',
        teamMannerTemperature: 34.4,
        teamUsers: [
          {
            teamUserId: 10,
            teamUserName: '쭝쭝',
          },
          {
            teamUserId: 11,
            teamUserName: '즈시',
          },
          {
            teamUserId: 12,
            teamUserName: '엘뮤싸',
          },
          {
            teamUserId: 13,
            teamUserName: '톤스용',
          },
          {
            teamUserId: 14,
            teamUserName: '리체',
          },
          {
            teamUserId: 15,
            teamUserName: '세호',
          },
        ],
      },
    ],
  },
};
