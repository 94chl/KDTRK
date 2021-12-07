interface TeamUser {
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
    sports: '축구',
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
    awayTeam: {
      teamId: 2,
      teamLogo: 's3://aassbb',
      teamName: '머쓱',
      teamMannerTemperature: 40.2,
      teamUsers: [
        {
          teamUserId: 11,
          teamUserName: '쫑쫑',
        },
        {
          teamUserId: 12,
          teamUserName: '즈시',
        },
        {
          teamUserId: 13,
          teamUserName: '엘쌰무',
        },
        {
          teamUserId: 14,
          teamUserName: '톤스용',
        },
        {
          teamUserId: 15,
          teamUserName: '리체',
        },
        {
          teamUserId: 16,
          teamUserName: '세호',
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

export const teamWithUser: TeamWithUser = {
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
    ],
  },
};

export interface MatchTypes {
  data: {
    matches: Omit<Match, 'homeTeam'>[];
    match: Match[];
    teamWithUser: TeamSimple[];
  };
}
