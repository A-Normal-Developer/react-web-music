import { Redirect } from "react-router-dom";

import RHDiscover from "@/pages/discover";
import RHFriend from "@/pages/friend";
import RHMine from "@/pages/mine";
import RHRecommend from "@/pages/discover/c-pages/recommend";
import RHRanking from "@/pages/discover/c-pages/ranking";
import RHSongs from "@/pages/discover/c-pages/songs";
import RHDjRadio from "@/pages/discover/c-pages/djradio";
import RHArist from "@/pages/discover/c-pages/artist";
import RHAlbum from "@/pages/discover/c-pages/album";
import RHPlayer from "@/pages/player";

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