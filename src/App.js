import React, { memo } from 'react';
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routes from "./router";
import RHAppFooter from "@/components/app-footer";
import RHAppHeader from "@/components/app-header";

const App = memo(() => {
  return (
    <HashRouter>
      <RHAppHeader/>
      {renderRoutes(routes)}
      <RHAppFooter/>
    </HashRouter>
  );
});

export default App;