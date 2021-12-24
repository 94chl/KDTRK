import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { HiresCreate } from '..';
import { previousHiresInfo } from '../HiresCreate/HiresCreate';

export interface hireItemType {
  postId?: number | undefined;
  teamLogo: string | undefined;
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  city: string | undefined;
  region: string | undefined;
  groundName: string | undefined;
  position: string | undefined;
  ageGroup: string | undefined;
  teamMannerTemperature: number | undefined;
  hiredPlayerNumber?: number | undefined;
  hirePlayerNumber: number | undefined;
  teamName: string | undefined;
  teamManagerName: string | undefined;
  detail: string | undefined;
}

interface hireItemWrapperType {
  hireItem: hireItemType;
}

const HiresEdit = () => {
  const { postId } = useParams<{ postId: string }>();
  const currentPostId = parseInt(postId, 10);
  const location = useLocation<hireItemWrapperType>();
  const { state } = location;
  const [prevData, setPrevData] = useState<previousHiresInfo>({
    prevHiredNumber: state.hireItem.hirePlayerNumber,
    prevDate: state.hireItem.date,
    prevStartTime: state.hireItem.startTime,
    prevEndTime: state.hireItem.endTime,
    prevCity: state.hireItem.city,
    prevRegion: state.hireItem.region,
    prevGroundName: state.hireItem.groundName,
    prevPosition: state.hireItem.position,
    prevAgeGroup: state.hireItem.ageGroup,
    prevDetail: state.hireItem.detail,
  });

  return (
    <>
      {Object.keys(prevData).length > 0 ? (
        <HiresCreate
          prevHiredNumber={prevData.prevHiredNumber}
          prevDate={prevData.prevDate}
          prevStartTime={prevData.prevStartTime}
          prevEndTime={prevData.prevEndTime}
          prevCity={prevData.prevCity}
          prevRegion={prevData.prevRegion}
          prevGroundName={prevData.prevGroundName}
          prevPosition={prevData.prevPosition}
          prevAgeGroup={prevData.prevAgeGroup}
          prevDetail={prevData.prevDetail}
          postId={currentPostId}
        />
      ) : (
        <HiresCreate />
      )}
    </>
  );
};

export default HiresEdit;
