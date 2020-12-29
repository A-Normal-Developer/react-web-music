import React, { memo } from 'react';

import { RecommendWrapper } from "./style";
import RHTopBanner from "./c-cpns/top-banner";


const RHRecommend = (props) => {

  return (
    <RecommendWrapper>
      <RHTopBanner/>
    </RecommendWrapper>
  );
};


export default memo(RHRecommend);