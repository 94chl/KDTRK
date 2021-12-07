import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './TempModal.module.scss';
import { Input, InputCheckBox } from '@/components';
import { TeamSimple } from '@/dummyMatch';

const { modalBackground, modalContainer } = styles;

const dropboxOptions = ['FC 체리', 'FC 한라봉', 'FC 부르릉'];

interface CheckboxOptions {
  [key: string]: boolean;
}
const checkboxOptions: CheckboxOptions = {
  'FC 체리': false,
  'FC 한라봉': false,
  'FC 부르릉': false,
};

interface TeamWithUser {
  teamWithUser: TeamSimple[];
}

const TempModal = ({ teamWithUser }: TeamWithUser) => {
  const [dropBox, setDropBox] = useState(dropboxOptions[0]);
  const [checkBox, setCheckBox] = useState(checkboxOptions);
  console.log(teamWithUser);
  const handleOnChangeDropBox = (e: any) => {
    setDropBox(e.target.value);
  };
  const handleOnChangeCheckBox = (e: any) => {
    const target: string = e.target.value;
    const newCheckBox = { ...checkBox };
    newCheckBox[target] = !newCheckBox[target];
    setCheckBox({ ...newCheckBox });
  };
  return (
    <div className={classNames(modalBackground)}>
      <div className={classNames(modalContainer)}>
        <Input
          inputId="input2"
          name="dropbox"
          type="dropbox"
          options={dropboxOptions}
          onChange={handleOnChangeDropBox}
        />
        <InputCheckBox name="checkbox" options={checkBox} onChange={handleOnChangeCheckBox} />
        <button type="button">신청</button>
      </div>
    </div>
  );
};

export default TempModal;
