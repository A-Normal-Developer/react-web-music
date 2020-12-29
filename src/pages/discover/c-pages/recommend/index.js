import React, { memo } from 'react';

import RHTopBanner from "./c-cpns/top-banner";
import RHHotRecommend from "./c-cpns/hot-recommend";
import RHNewAlbum from "./c-cpns/new-album";
import RHRecommendRanking from "./c-cpns/recommend-ranking";

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";


const RHRecommend = (props) => {

  return (
    <RecommendWrapper>
      <RHTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
          <RHHotRecommend/>
          <RHNewAlbum/>
          <RHRecommendRanking/>
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  );
};


export default memo(RHRecommend);