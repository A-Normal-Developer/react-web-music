import React, { memo } from 'react';

import RHTopBanner from "./c-cpns/top-banner";
import RHHotRecommend from "./c-cpns/hot-recommend";
import RHNewAlbum from "./c-cpns/new-album";
import RHRecommendRanking from "./c-cpns/recommend-ranking";
import RHUserLogin from "./c-cpns/user-login";
import RHSettleSinger from "./c-cpns/settle-singer";
import RHHotAnchor from "./c-cpns/hot-anchor";

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
        <RecommendRight>
          <RHUserLogin/>
          <RHSettleSinger/>
          <RHHotAnchor/>
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  );
};


export default memo(RHRecommend);