import { lazy } from 'react';

const Page1 = lazy(() => import('./VR/index.tsx')); 
const Page2 = lazy(() => import('./pages/page1/index.tsx')); 
const Page3 = lazy(() => import('./pages/page2/index.tsx')); // 虚拟号绑定/解绑日志：

const routes = [
  { name: 'vr', component: Page1, path: '/Page1' },
  { name: '支付', component: Page2, path: '/Page2' },
  { name: '虚拟', component: Page3, path: '/Page3' },
];

export default routes;
