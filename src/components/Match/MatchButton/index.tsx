import React from 'react';

interface Props {
  isAuthor: boolean;
}

const MatchButton = ({ isAuthor }: Props) => {
  return (
    <div>
      <button>approve</button>
      <button>apply</button>
    </div>
  );
};

export default MatchButton;
