import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import styles from './TempModal.module.scss';
import { Input, InputCheckBox } from '@/components';
import { TeamSimple, TeamUser } from '@/dummyMatch';
import useMount from '@/hooks/useMount';

const { modalBackground, modalContainer, show } = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface TeamWithUser {
  userTeam: TeamSimple[];
  showModal: boolean;
}

const TempModal = ({ userTeam, showModal }: TeamWithUser) => {
  const placeholder = '팀을 선택해주세요';
  const teamNames = userTeam.map((team) => team.teamName);
  const [selectedTeam, setSelectedTeam] = useState(teamNames[0]);
  const [teamMembers, setTeamMembers] = useState({});

  const setSelectedTeamUsers = useCallback(() => {
    const selectedTeamInfo = userTeam.filter((team) => team.teamName === selectedTeam)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];
    const teamUsersOptions: CheckboxOptions = {};
    selectedTeamUsers.forEach((user) => {
      if (user.teamUserName) teamUsersOptions[user.teamUserName] = false;
    });
    return teamUsersOptions;
  }, [selectedTeam, userTeam]);

  const handleOnChangeDropBox = (e: any) => {
    setSelectedTeam(e.target.value);
  };

  const handleOnChangeCheckBox = (e: any) => {
    const target: string = e.target.value;
    const newCheckBox: CheckboxOptions = { ...teamMembers };
    newCheckBox[target] = !newCheckBox[target];
    setTeamMembers({ ...newCheckBox });
  };

  useEffect(() => {
    const newTeamUsers = setSelectedTeamUsers();
    setTeamMembers({ ...newTeamUsers });
  }, [setTeamMembers, setSelectedTeamUsers]);

  const onSubmit = () => {
    if (!selectedTeam || selectedTeam === placeholder) {
      console.log('ERROR');
      return;
    }
    const selectedTeamWithUsers = {
      teamId: userTeam.filter((team) => team.teamName === selectedTeam)[0].teamId,
      players: Object.entries(teamMembers).reduce((acc: string[], cur) => {
        if (cur[1]) acc.push(cur[0]);
        return acc;
      }, []),
    };
    console.log(selectedTeamWithUsers);
  };

  return (
    <div className={classNames(modalBackground, { [show]: showModal })}>
      <div className={classNames(modalContainer)}>
        <Input
          inputId="input2"
          labelName="dropbox"
          type="dropbox"
          options={[placeholder, ...teamNames]}
          onChange={handleOnChangeDropBox}
        />
        {Object.keys(teamMembers).length > 0 && (
          <InputCheckBox
            labelName={selectedTeam}
            options={teamMembers}
            onChange={handleOnChangeCheckBox}
          />
        )}
        <button type="button" onClick={onSubmit}>
          신청
        </button>
      </div>
    </div>
  );
};

export default TempModal;
