import React, { useState, useEffect, useCallback, Fragment } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MatchApproveModal.module.scss';
import { TeamCard } from '@/components';
import { RootState } from '@/store';
import { fetchWaitingTeams, match } from '@/store/match/match';
import useMount from '@/hooks/useMount';

const {
  modalBackground,
  modalContainer,
  showModal,
  teamCardContainer,
  selectedTeamCard,
  buttonBox,
  submitButton,
} = styles;

interface CheckboxOptions {
  [key: string]: boolean;
}

interface ModalState {
  showMatchApproveModal: boolean;
  sports?: string;
}

interface SportsPlayers {
  [key: string]: number;
}

const sportsPlayers: SportsPlayers = {
  축구: 11,
  풋살: 6,
};

const MatchApproveModal = ({ showMatchApproveModal, sports }: ModalState) => {
  const { waitingTeams } = useSelector((store: RootState) => store.match).data;
  const [selectedTeam, setSelectedTeam] = useState(waitingTeams[0]);

  const dispatch = useDispatch();
  useMount(() => {
    dispatch(fetchWaitingTeams(1));
  });

  const handleCloseModal = (e: any) => {
    if (e.target.classList.contains('modalBackground')) {
      dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
    }
  };

  const onSubmit = () => {
    if (!selectedTeam) {
      window.alert('팀을 선택해주세요');
      return;
    }

    console.log(`teamId:${selectedTeam.teamWaitingId}`, selectedTeam);
    // dispatch(match.actions.toggleModal({ modalName: 'matchApprove' }));
  };

  const handleOnChangeTeamCard = (e: any) => {
    setSelectedTeam(waitingTeams[e.target.value]);
  };

  return (
    <div
      className={classNames('modalBackground', modalBackground, {
        [showModal]: showMatchApproveModal,
      })}
      onClick={handleCloseModal}
      role="presentation"
    >
      <div className={classNames(modalContainer)}>
        {waitingTeams.map((team, index) => (
          <div key={`teamCard${team.teamId}`} className={classNames(teamCardContainer)}>
            <label
              className={classNames({
                [selectedTeamCard]: selectedTeam && selectedTeam.teamId === team.teamId,
              })}
              htmlFor={`teamCard${team.teamId}`}
            >
              <TeamCard key={`teamInfo${team.teamId}`} team={team} />
              <input
                type="radio"
                id={`teamCard${team.teamId}`}
                name="selectTeamCard"
                value={index}
                onChange={handleOnChangeTeamCard}
              />
            </label>
          </div>
        ))}
        <div className={classNames(buttonBox)}>
          <button className={classNames(submitButton)} type="button" onClick={onSubmit}>
            신청
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchApproveModal;
