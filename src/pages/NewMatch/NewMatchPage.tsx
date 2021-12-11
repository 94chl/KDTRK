import React, { useEffect, useState, useCallback } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { getSkeletonUtilityClass } from '@mui/material';
import { Input, InputCheckBox, InputDetail } from '@/components';
import { RootState } from '@/store';
import useMount from '@/hooks/useMount';
import { fetchTeamWithUser, match } from '@/store/match/match';
import { fetchUserInfo } from '@/store/user/user';

const SPORTS = ['축구', '풋살'];
const CITY = ['서울시', '경기도', '인천'];
const REGION = ['금천구', '강서구', '강남구', '송파구', '남양주'];
const GROUND_NAME = ['유제두 체육관', '제1 체육관', '제2체육관'];
interface Location {
  city: string;
  region: string[];
}
interface Regions {
  region: string;
  groundName: string[];
}
const locations: Location[] = [
  {
    city: '서울',
    region: ['강남구', '송파구', '금천구'],
  },
  {
    city: '경기도',
    region: ['남양주', '용인', '수원'],
  },
  {
    city: '인천',
    region: ['남동구', '부평구'],
  },
];

const regions: Regions[] = [
  { region: '강남구', groundName: ['A체육관', 'B체육관', 'C체육관'] },
  { region: '송파구', groundName: ['제 1 체육관', '제 2 체육관', '제 3 체육관'] },
  {
    region: '금천구',
    groundName: ['갑 스타디움', '을 스타디움', '병 스타디움', '정 스타디움'],
  },

  { region: '남양주', groundName: ['Ground F', 'Ground C'] },
  { region: '용인', groundName: ['제일구장', '제이구장', '제삼구장'] },
  { region: '수원', groundName: ['가필드', '나필드', '다필드'] },
  { region: '남동구', groundName: ['A파크', 'B파크', 'C파크'] },
  { region: '부평구', groundName: ['제 1 운동장', '제 2 운동장', '제 3 운동장'] },
];

interface CheckboxOptions {
  [key: string]: boolean;
}

interface StringKey {
  [key: string]: number | string;
}

const sportsPlayers: StringKey = {
  축구: 11,
  풋살: 6,
};

const NewMatch = () => {
  const dispatch = useDispatch();
  const tokenDummy = 123;
  useMount(() => {
    dispatch(fetchUserInfo(tokenDummy));
    dispatch(fetchTeamWithUser(tokenDummy));
  });

  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [formatedStartTime, setFormatedStartTime] = useState<string>('');
  const [formatedEndTime, setFormatedEndTime] = useState<string>('');
  const [maximumDate, setMaximumDateDate] = useState<any>(new Date());
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [currentMonth, setCurrentMonth] = useState<any>(new Date().getMonth());
  const [date, setDate] = useState<Date | null>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const newDate = new Date();

    const startHour = newDate.getHours();
    const endHour = startHour >= 22 ? startHour - 22 : startHour;
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formettedStartTime = `${startHour}:${minute}:${seconds}`;
    const formettedEndTime = `${endHour + 2}:${minute}:${seconds}`;

    setFormatedStartTime(formettedStartTime);
    setFormatedEndTime(formettedEndTime);
  }, []);

  useEffect(() => {
    const newDate = new Date();
    setCurrentMonth(newDate.getMonth());
    maximumDate.setMonth(newDate.getMonth() + 1);
    setMaximumDateDate(maximumDate);
    setCurrentDate(currentDate);
    currentDate.setMonth(newDate.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const hanldeChangeDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();
    setDate(newDate);

    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const formedDate = `${year}-${month + 1}-${day}`;
    setFormattedDate(formedDate);
  };

  const handleChangeStartDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    const startHour = newDate.getHours();
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formettedStartTime = `${startHour}:${minute}:${seconds}`;

    setFormatedStartTime(formettedStartTime);
    setStartTime(selectedDate);
  };

  const handleChangEndDate = (selectedDate: React.SetStateAction<Date | null>) => {
    const newDate = selectedDate ? new Date(selectedDate.toString()) : new Date();

    const startHour = newDate.getHours();
    const endHour = startHour >= 22 ? startHour - 22 : startHour;
    const minute = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formettedEndTime = `${endHour}:${minute}:${seconds}`;

    setFormatedEndTime(formettedEndTime);
    setEndTime(selectedDate);
  };

  const handleClickSelectDone = () => {
    const data = {
      date: formattedDate,
      startTime: formatedStartTime,
      endTime: formatedEndTime,
    };

    const startHour = startTime?.getHours();
    const endHour = endTime?.getHours();
    const calculatedStartHour = startHour && startHour >= 12 ? startHour - 12 : startTime;
    const calculatedEndHour = endHour && endHour >= 12 ? endHour - 12 : endHour;

    const startMinute = startTime?.getMinutes();
    const endMinute = endTime?.getMinutes();

    const isStartHourBigger =
      calculatedStartHour && calculatedEndHour && calculatedStartHour > calculatedEndHour;
    const isStartMinuteBigger = startMinute && endMinute && startMinute > endMinute;

    if (isStartHourBigger || (!isStartHourBigger && isStartMinuteBigger)) {
      alert('시간을 다시 입력해주세요');
      return;
    }
    // Todo : 서버에 입력된 데이터 보내기
    console.log(data);
  };

  const placeholder = '선택';
  const [simpleInput, setSimpleInput] = useState<StringKey>({
    sports: '',
    city: '',
    region: '',
    groundName: '',
    cost: 0,
    detail: '',
  });
  const regionOptions = [
    placeholder,
    ...(locations.filter((location) => location.city === simpleInput.city)[0].region || ''),
  ];
  const groundOptions = [
    placeholder,
    ...(regions.filter((regionInfo) => regionInfo.region === simpleInput.region)[0].groundName ||
      ''),
  ];
  const { userTeams } = useSelector((store: RootState) => store.match).data;
  const userLimit = sportsPlayers[simpleInput.sports] || 0;
  const teamNames = userTeams.map((team) => team.teamName);
  const [selectedTeam, setSelectedTeam] = useState(placeholder);
  const [teamMembers, setTeamMembers] = useState<CheckboxOptions>({});

  const setSelectedTeamUsers = useCallback(() => {
    const selectedTeamInfo = userTeams.filter((team) => team.teamName === selectedTeam)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];
    const teamUsersOptions: CheckboxOptions = {};
    selectedTeamUsers.forEach((user) => {
      if (user.teamUserName) teamUsersOptions[user.teamUserName] = false;
    });
    return teamUsersOptions;
  }, [selectedTeam, userTeams]);

  const handleInputValue = (e: any, category: string) => {
    const targetInput = category === 'detail' ? e : e.target.value;
    console.log(category, targetInput);
    setSimpleInput({ ...simpleInput, [category]: targetInput });
    console.log(simpleInput);
  };

  const handleOnChangeTeams = (e: any) => {
    setSelectedTeam(e.target.value);
  };

  const handleOnChangeTeamMembers = (e: any) => {
    const target: string = e.target.value;
    const newTeamMembers: CheckboxOptions = { ...teamMembers };
    newTeamMembers[target] = !newTeamMembers[target];
    setTeamMembers({ ...newTeamMembers });
  };

  useEffect(() => {
    const newTeamUsers = setSelectedTeamUsers();
    setTeamMembers({ ...newTeamUsers });
  }, [setTeamMembers, setSelectedTeamUsers]);

  const onSubmit = () => {
    if (!selectedTeam || selectedTeam === placeholder) {
      window.alert('올바른 팀을 선택해주세요');
      return;
    }
    const selectedTeamInfo = userTeams.filter((team) => team.teamName === selectedTeam)[0];
    const selectedTeamUsers = selectedTeamInfo ? selectedTeamInfo.teamUsers : [];

    const selectedTeamWithUsers = {
      teamId: userTeams.filter((team) => team.teamName === selectedTeam)[0].teamId,
      players: selectedTeamUsers.filter(
        (user) => user.teamUserName && teamMembers[user.teamUserName]
      ),
    };
    if (selectedTeamWithUsers.players.length !== userLimit) {
      window.alert('인원미달');
    }

    // Parameters
    // Path = matchId
    // Body = teamId: Number, players: Array
    // dispatch(match.actions.toggleModal({ modalName: 'matchApply' }));
  };

  return (
    <>
      <Input
        inputId="input1"
        labelName="종목 선택"
        type="dropbox"
        options={[placeholder, ...SPORTS]}
        onChange={(e) => handleInputValue(e, 'sports')}
      />
      <Input
        inputId="input2"
        labelName="팀 선택"
        type="dropbox"
        options={[placeholder, ...teamNames]}
        onChange={handleOnChangeTeams}
      />
      {Object.keys(teamMembers).length > 0 && (
        <InputCheckBox
          labelName={`${selectedTeam}(${
            Object.values(teamMembers).filter((member) => member).length
          }/${sportsPlayers[simpleInput.sports]})`}
          options={teamMembers}
          onChange={handleOnChangeTeamMembers}
          icon="far fa-check-square"
        />
      )}
      <Input
        inputId="input3"
        labelName="행정구역"
        type="dropbox"
        options={[placeholder, ...locations.map((location) => location.city)]}
        onChange={(e) => handleInputValue(e, 'city')}
        styleProps={{ inputContentWidth: '50%' }}
      />
      <Input
        inputId="input4"
        labelName="시/군/구"
        type="dropbox"
        options={regionOptions}
        onChange={(e) => handleInputValue(e, 'region')}
        styleProps={{ inputContentWidth: '50%' }}
      />
      <Input
        inputId="input5"
        labelName="구장"
        type="dropbox"
        options={groundOptions}
        onChange={(e) => handleInputValue(e, 'groundName')}
      />
      <Input
        inputId="input6"
        labelName="참가비"
        type="text"
        onChange={(e) => handleInputValue(e, 'cost')}
      />
      <InputDetail
        labelName="상세정보"
        placeholder="텍스트를 입력하세요"
        onChange={(e) => handleInputValue(e, 'detail')}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={date}
          onChange={hanldeChangeDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={startTime}
          onChange={handleChangeStartDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={endTime}
          onChange={handleChangEndDate}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <button type="button" onClick={onSubmit}>
        선택 완료
      </button>
    </>
  );
};

export default NewMatch;
