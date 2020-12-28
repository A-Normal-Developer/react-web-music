import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getTopBannerAction } from "./store/actionCreators";


const RHRecommend = (props) => {

  const {topBanners} = useSelector(state => ({
    topBanners: state.recommend.topBanners
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch]);

  return (
    <div>
      <h2>RHRecommend</h2>
    </div>
  );
};


export default memo(RHRecommend);