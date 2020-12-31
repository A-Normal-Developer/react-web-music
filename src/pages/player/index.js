import React, { memo } from 'react';
import {
  PlayerWrapper,
  PlayerLeft,
  PlayerRight
} from "./style";


const RHPlayer = memo(() => {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
        </PlayerLeft>
        <PlayerRight>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  );
});

export default RHPlayer;