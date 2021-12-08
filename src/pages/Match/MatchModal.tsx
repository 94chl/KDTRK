import React, { useState, useEffect } from 'react';
import { Input, InputCheckBox, InputDetail } from '@/components';

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
    setDetail(e);
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
        labelName="text"
        type="text"
        icon="fas fa-comment"
        placeholder="텍스트를 입력하시오"
        onChange={handleOnChangeText}
      />
      <Input
        inputId="input2"
        labelName="dropbox"
        type="dropbox"
        options={dropboxOptions}
        onChange={handleOnChangeDropBox}
      />
      <InputCheckBox labelName="checkbox" options={checkBox} onChange={handleOnChangeCheckBox} />
      <InputDetail
        labelName="text"
        placeholder="텍스트를 입력하시오"
        onChange={handleOnChangeDetail}
      />
    </div>
  );
};

export default MatchModal;
