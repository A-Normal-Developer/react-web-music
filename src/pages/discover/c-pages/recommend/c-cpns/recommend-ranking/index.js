import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RHThemeHeaderRCM from "@/components/theme-header-rcm";
import { getTopListAction } from "../../store/actionCreators";

import RHTopRanking from "@/components/top-ranking";

import { RankingWrapper } from "./style";



const RHRecommendRanking = memo((props) => {
  // state and props

  // redux hooks
  const {upRanking, newRanking, originRanking} = useSelector(state => ({
    upRanking: state.getIn(["recommend", "upRanking"]),
    newRanking: state.getIn(["recommend", "newRanking"]),
    originRanking: state.getIn(["recommend", "originRanking"])
  }), shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopListAction(0));
    dispatch(getTopListAction(2));
    dispatch(getTopListAction(3));
  },[dispatch]);
  // other hook
  return (
    <RankingWrapper>
      <RHThemeHeaderRCM title="榜单"/>
      <div className="tops">
        <RHTopRanking info={upRanking} />
        <RHTopRanking info={newRanking} />
        <RHTopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  );
});

export default RHRecommendRanking;