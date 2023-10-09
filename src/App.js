// import './App.css';
import React from "react";
import { Route, Routes,Link, } from 'react-router-dom';
import { lazy } from 'react';

const Vr = lazy(() => import('./VR/index.tsx')); 
const Page1 = lazy(() => import('./pages/page1/index.tsx')); 
// import {Vr} from './VR/index.tsx'
// import Page1 from './pages/page1/index.tsx'
function App() {
  return (
    <div className="App">
         <Link to="/Page1" key={1}> 11121 </Link>
         <Link to="/Page2" key={2}> ererer</Link>

            {/* 注册路由 */}
      <Routes>
        <Route path="/Page1" key={1} element={<Vr />} />
        <Route path="/Page2" key={2} element={<Page1 />} />
        {/* <Redirect to="/Page1" /> */}
      </Routes>
    </div>
  );
}

export default App;
