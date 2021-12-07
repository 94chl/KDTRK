import React from 'react';
import classNames from 'classnames';
import styles from './InputCheckBox.module.scss';

interface Props {
  name: string;
  options?: string[];
  onChange: React.FormEventHandler<HTMLFormElement>;
}

const { inputBox, inputName, inputContent, input, input_checkBox, label, checkBox, checkBoxIcon } =
  styles;

const InputCheckBox = ({ name, options, onChange }: Props) => {
  return (
    <div className={classNames(inputBox)}>
      <div className={classNames(inputName)}>
        <h3>{name}</h3>
      </div>
      <div className={classNames(inputContent)}>
        <form className={classNames(input)} onChange={onChange}>
          {options?.map((option, index) => (
            <div className={classNames(input_checkBox)} key={`dropBoxOption${index}`}>
              <label className={classNames(label)} htmlFor={`checkBox${option}`}>
                {option}
              </label>
              <input
                className={classNames(checkBox)}
                type="checkbox"
                value={option}
                id={`checkBox${option}`}
              />
              <i className={classNames('far fa-check-square', checkBoxIcon)} />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default InputCheckBox;
