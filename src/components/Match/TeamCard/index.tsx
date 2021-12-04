import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Team } from '@/store/team';

interface Props {
  team: Team;
}

const TeamCard = ({ team }: Props) => {
  return (
    <div>
      <div>LOGO</div>
      <div>{team.teamName}</div>
      <div>{team.captainName}</div>
    </div>
  );
};

export default TeamCard;
