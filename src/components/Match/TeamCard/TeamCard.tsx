import React from 'react';
import classNames from 'classnames';
import { Team } from '@/dummyMatch';
import styles from './TeamCard.module.scss';

interface Props {
  team: Team;
}

const { TeamInfoCard, logo, teamName, captainInfo, captainName, buttonBox, tags, tag } = styles;

const TeamCard = ({ team }: Props) => {
  return (
    <div className={classNames(TeamInfoCard)}>
      <div className={classNames(logo)}>
        <img src={team.teamLogo} alt="team_logo" />
      </div>
      <div className={classNames(teamName)}>{team.teamName}</div>
      <div className={classNames(captainInfo)}>
        <div className={classNames(captainName)}>
          {team.teamUsers.filter((user) => user.captainId)[0].captainName}
        </div>
        <div className={classNames(buttonBox)}>
          <button type="button">
            <i className="fas fa-user" />
          </button>
          <button type="button">
            <i className="fas fa-comment" />
          </button>
        </div>
      </div>
      <div className={classNames(tags)}>
        <div className={classNames(tag)}>{`${team.teamMannerTemperature}℃`}</div>
      </div>
    </div>
  );
};

export default TeamCard;
