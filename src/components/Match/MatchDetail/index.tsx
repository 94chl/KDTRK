import React from 'react';
import classNames from 'classnames';
import styles from './MatchDetail.module.scss';
import { Match } from '@/dummy';

interface Props {
  match: Match;
}

const MatchDetail = ({ match }: Props) => {
  return (
    <div className={classNames(styles.matchDetail)}>
      <div className={classNames(styles.matchDetail_menu)}>
        <h3 className={classNames(styles.name)}>상세정보</h3>
        <div className={classNames(styles.buttonBox)}>
          <button className={classNames(styles.modifyButton)} type="button">
            <i className="fas fa-pen" />
          </button>
          <button className={classNames(styles.removeButton)} type="button">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className={classNames(styles.matchDetail_content)}>{match.detail}</div>
    </div>
  );
};

export default MatchDetail;
