import React from 'react';
import classNames from 'classnames';
import styles from './TagCheckBox.module.scss';

interface Options {
  [key: string]: boolean;
}
interface Props {
  labelName: string;
  options: Options;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const { inputBox, inputName, inputContent, inputCheckBox, label, checkBox, selected } = styles;

const TagCheckBox = ({ labelName, options, onChange }: Props) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{labelName}</h3>
      </div>
      <div className={classNames(inputContent)}>
        {Object.keys(options).map((option, index) => (
          <div
            className={classNames(inputCheckBox, {
              [selected]: options[option],
            })}
            key={`dropBoxOption${index}`}
          >
            <label className={classNames(label)} htmlFor={`checkBox${option}`}>
              {option}
            </label>
            <input
              className={classNames(checkBox)}
              type="checkbox"
              value={option}
              id={`checkBox${option}`}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagCheckBox;
