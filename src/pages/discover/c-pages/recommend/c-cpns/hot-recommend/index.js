import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import RHThemeHeaderRCM from "@/components/theme-header-rcm";
import RHSongsCover from "@/components/songs-cover";

import { HOT_RECOMMEND_LIMIT } from "@/common/constants";
import { getHotRecommendAction } from "../../store/actionCreators";

import {
  HotRecommendWrapper
} from "./style";


const RHHotRecommend = memo(() => {
  // state


  // redux hooks
  const {hotRecommends} = useSelector(state => ({
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }), shallowEqual);
  const dispatch = useDispatch();

  // other hooks
  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  },[dispatch]);

  return (
    <HotRecommendWrapper>
      <RHThemeHeaderRCM title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]}/>
      <div className="recommend-list">
        {
          hotRecommends.map((item, index) => {
            return (
              <RHSongsCover key={item.id} info={item}/>
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  );
});

export default RHHotRecommend;