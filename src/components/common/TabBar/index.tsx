import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './TabBar.module.scss';

const TabBar = () => {
  return (
    <div className={classNames(styles.tabBar)}>
      <nav>
        <Link to={'/'}>홈</Link>
      </nav>
      <nav>
        <Link to={'/matches'}>매칭</Link>
      </nav>
      <nav>
        <Link to={'/guest'}>용병</Link>
      </nav>
      <nav>
        <Link to={'/team'}>팀</Link>
      </nav>
      <nav>
        <Link to={'/me'}>개인</Link>
      </nav>
    </div>
  );
};

export default TabBar;
