import RHDiscover from "@/pages/discover";
import RHFriend from "@/pages/friend";
import RHMine from "@/pages/mine";

const routes = [
  {
    path: "/",
    exact: true,
    component: RHDiscover
  },
  {
    path: "/discover",
    component: RHDiscover
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