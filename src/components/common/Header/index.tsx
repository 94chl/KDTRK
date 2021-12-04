import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';

const Header = () => {
  const handleGoBack = () => {
    history.go(-1);
  };

  return (
    <div className={classNames(styles.header)}>
      <button onClick={handleGoBack}>back</button>
      <h1>
        <Link to={'/'}>logo</Link>
      </h1>
      <div className={classNames(styles.buttonBox)}>
        <button>
          {/* 로그인 상태 생기면 토글로 로그인/로그아웃 구분 */}
          <Link to={'/login'}>login</Link>
        </button>
        <button>
          <Link to={'/setting'}>setting</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
