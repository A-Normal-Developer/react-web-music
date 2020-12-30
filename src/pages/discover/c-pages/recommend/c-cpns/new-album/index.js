import React, { memo, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Carousel } from "antd";

import RHThemeHeaderRCM from "@/components/theme-header-rcm";
import RHAlbumCover from "@/components/album-cover";
import { NEW_ALBUM_LIMIT } from "@/common/constants";

import { getNewAlbumAction } from "../../store/actionCreators";
import { AlbumWrapper } from "./style";


const RHNewAlbum = memo(() => {
  // state

  // redux hooks
  const {newAlbums} = useSelector((state) => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }), shallowEqual);
  const dispatch = useDispatch();


  // other hooks
  const pageRef = useRef();
  useEffect(() => {
    dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT))
  },[dispatch]);

 return (
  <AlbumWrapper>
   <RHThemeHeaderRCM title="新碟上架"/>
   <div className="content">
     <button className="arrow arrow-left sprite_02" onClick={e => pageRef.current.prev()}></button>
     <div className="album">
       <Carousel dots={false} ref={pageRef}>
         {
           [0, 1].map(item => {
             return (
               <div key={item} className="page">
                 {
                   newAlbums.slice(item * 5, (item + 1) * 5).map(iten => {
                     return <RHAlbumCover key={iten.id} info={iten} size={100} width={118} bgp={"-570px"}/>
                   })
                 }
               </div>
             )
           })
         }
       </Carousel>
     </div>
     <button className="arrow arrow-right sprite_02" onClick={e => pageRef.current.next()}></button>
   </div>
  </AlbumWrapper>
 );
});

export default RHNewAlbum;