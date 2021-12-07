import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, InputCheckBox, InputDetail } from '@/components/common';
import { TempModal } from '@/components';
import { fetchTeamWithUser } from '@/store/matches/matches';
import useMount from '@/hooks/useMount';
import { RootState } from '@/store';

const dropboxOptions = ['apple', 'cherry', 'tomato'];

interface CheckboxOptions {
  [key: string]: boolean;
}
const checkboxOptions: CheckboxOptions = { apple: false, cherry: false, tomato: false };

const MatchModal = () => {
  const [text, setText] = useState('');
  const [dropBox, setDropBox] = useState(dropboxOptions[0]);
  const [checkBox, setCheckBox] = useState(checkboxOptions);
  const [detail, setDetail] = useState('');

  const dispatch = useDispatch();

  useMount(() => {
    dispatch(fetchTeamWithUser(1));
  });

  const { teamWithUser } = useSelector((store: RootState) => store.matches).data;

  const handleOnChangeText = (e: any) => {
    setText(e.target.value);
  };

  const handleOnChangeDropBox = (e: any) => {
    setDropBox(e.target.value);
  };

  const handleOnChangeCheckBox = (e: any) => {
    const target: string = e.target.value;
    const newCheckBox = { ...checkBox };
    newCheckBox[target] = !newCheckBox[target];
    setCheckBox({ ...newCheckBox });
  };

  const handleOnChangeDetail = (e: any) => {
    setDetail(e.target.value);
  };

  useEffect(() => {
    console.log('text', text);
    console.log('drop', dropBox);
    console.log('check', checkBox);
    console.log('detail', detail);
  }, [text, dropBox, checkBox, detail]);

  return (
    <div>
      <div>Modify</div>
      <Input
        inputId="input1"
        name="text"
        type="text"
        icon="fas fa-comment"
        placeholder="텍스트를 입력하시오"
        onChange={handleOnChangeText}
      />
      <Input
        inputId="input2"
        name="dropbox"
        type="dropbox"
        options={dropboxOptions}
        onChange={handleOnChangeDropBox}
      />
      <InputCheckBox name="checkbox" options={checkBox} onChange={handleOnChangeCheckBox} />
      <InputDetail name="text" placeholder="텍스트를 입력하시오" onChange={handleOnChangeDetail} />
      <TempModal teamWithUser={teamWithUser} />
    </div>
  );
};

export default MatchModal;
