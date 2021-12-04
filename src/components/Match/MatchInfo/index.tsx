import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import classNames from 'classnames';
import { Match } from '@/store/match';

interface Props {
  match: Match;
}

const MatchInfo = ({ match }: Props) => {
  return (
    <div>
      <div>
        <h3>남은 시간</h3>
        <h3>상태</h3>
      </div>
      <div>
        <div>
          <span>종목</span>
          <span>{match.sports}</span>
        </div>
        <div>
          <span>상태</span>
          <span>{match.status}</span>
        </div>
        <div>
          <span>연령대</span>
          <span>{match.ageGroup}</span>
        </div>
        <div>
          <span>참가비</span>
          <span>{match.cost}</span>
        </div>
      </div>
      <div className={classNames('important')}>
        <div>
          <span>날짜</span>
          <span>{`${match.date} ${match.startTime}`}</span>
        </div>
        <div>
          <span>장소</span>
          <span>{`${match.city} ${match.region} ${match.groundName}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
