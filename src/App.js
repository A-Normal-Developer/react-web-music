import React, { memo, Suspense } from 'react';
import { Provider } from "react-redux";

import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routes from "./router";
import store from "./store";
import RHAppFooter from "@/components/app-footer";
import RHAppHeader from "@/components/app-header";
import RHAppPlayerBar from "@/pages/player/app-player-bar";

const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <RHAppHeader/>
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <RHAppFooter/>
        <RHAppPlayerBar/>
      </HashRouter>
    </Provider>
  );
});

export default App;