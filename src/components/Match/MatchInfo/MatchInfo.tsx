import React from 'react';
import classNames from 'classnames';
import { Match } from '@/dummyMatch';
import styles from './MatchInfo.module.scss';

interface Props {
  match: Match;
}

const {
  matchInfoCard,
  matchInfoRow,
  importantInfo,
  normalnfo,
  matchInfo,
  matchInfo_name,
  matchInfo_content,
} = styles;

const MatchInfo = ({ match }: Props) => {
  const today = new Date();
  const matchDay = new Date(match.date);
  const dDay = Math.ceil((matchDay.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24));

  return (
    <div className={classNames(matchInfoCard)}>
      <div className={classNames(matchInfoRow)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{`${match.date} ${match.startTime}`}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{dDay && `D-${dDay}`}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>추후 업뎃</div>
        </div>
      </div>
      <div className={classNames(matchInfoRow, importantInfo)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_name)}>장소</div>
          <div className={classNames(matchInfo_content)}>
            {`${match.city} ${match.region} ${match.groundName}`}
          </div>
        </div>
      </div>
      <div className={classNames(matchInfoRow, normalnfo)}>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.ageGroup}</div>
        </div>
        <div className={classNames(matchInfo)}>
          <div className={classNames(matchInfo_content)}>{match.cost}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
