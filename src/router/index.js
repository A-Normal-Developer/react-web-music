import React from "react";
import { Redirect } from "react-router-dom";

const RHDiscover = React.lazy(() => import("@/pages/discover"));
const RHFriend = React.lazy(() => import("@/pages/friend"));
const RHMine = React.lazy(() => import("@/pages/mine"));
const RHRecommend = React.lazy(() => import("@/pages/discover/c-pages/recommend"));
const RHRanking = React.lazy(() => import("@/pages/discover/c-pages/ranking"));
const RHSongs = React.lazy(() => import("@/pages/discover/c-pages/songs"));
const RHDjRadio = React.lazy(() => import("@/pages/discover/c-pages/djradio"));
const RHArist = React.lazy(() => import("@/pages/discover/c-pages/artist"));
const RHAlbum = React.lazy(() => import("@/pages/discover/c-pages/album"));
const RHPlayer = React.lazy(() => import("@/pages/player"));


const routes = [
  {
    path: "/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path: "/discover",
    component: RHDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to={"/discover/recommend"}/>
        )
      },
      {
        path: "/discover/recommend",
        component: RHRecommend
      },
      {
        path: "/discover/ranking",
        component: RHRanking
      },
      {
        path: "/discover/songs",
        component: RHSongs
      },
      {
        path: "/discover/djradio",
        component: RHDjRadio
      },
      {
        path: "/discover/artist",
        component: RHArist
      },
      {
        path: "/discover/album",
        component: RHAlbum
      },
      {
        path: "/discover/player",
        component: RHPlayer
      },
    ]
  },
  {
    path: "/mine",
    component: RHMine
  },
  {
    path: "/friend",
    component: RHFriend
  },
];


export default routes