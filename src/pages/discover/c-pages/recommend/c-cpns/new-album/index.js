import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import RHThemeHeaderRCM from "@/components/theme-header-rcm";
import { NEW_ALBUM_LIMIT } from "@/common/constants";

import { getNewAlbumAction } from "../../store/actionCreators";


const RHNewAlbum = memo(() => {
  // state

  // redux hook
  const {newAlbums} = useSelector((state) => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT))
  },[dispatch]);

 return (
  <div>
   <RHThemeHeaderRCM title="新碟上架"/>
  </div>
 );
});

export default RHNewAlbum;