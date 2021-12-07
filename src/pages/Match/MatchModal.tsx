import React, { useState, useEffect } from 'react';
import { Input, InputCheckBox, InputDetail } from '@/components/common';

const options = ['apple', 'cherry', 'tomato'];

const MatchModal = () => {
  const [text, setText] = useState('');
  const [dropBox, setDropBox] = useState(options[0]);
  const [checkBox, setCheckBox] = useState([]);
  const [detail, setDetail] = useState('');

  const handleOnChangeText = (e: any) => {
    setText(e.target.value);
  };

  const handleOnChangeDropBox = (e: any) => {
    setDropBox(e.target.value);
  };

  const handleOnChangeCheckBox = (e: any) => {
    const target = e.target.value;
    console.log(target);
    console.log(checkBox.findIndex(target));
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
        name="text"
        type="text"
        icon="fas fa-comment"
        placeholder="텍스트를 입력하시오"
        onChange={handleOnChangeText}
      />
      <Input name="dropbox" type="dropbox" options={options} onChange={handleOnChangeDropBox} />
      <InputCheckBox name="checkbox" options={options} onChange={handleOnChangeCheckBox} />
      <InputDetail name="text" placeholder="텍스트를 입력하시오" onChange={handleOnChangeDetail} />
    </div>
  );
};

export default MatchModal;
