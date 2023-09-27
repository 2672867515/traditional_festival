import { Modal } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
 //导入hdr图像加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";//rebe加载器
import Luck from '../praise/index.tsx'

const Vr=()=>{
   // 1、创建场景
   const scene = new THREE.Scene();
   // 2、创建相机
   const camera = new THREE.PerspectiveCamera(
     75,
     window.innerWidth / window.innerHeight,
     0.1,
     1000
   );
   // 设置相机位置
   camera.position.set(0, 0, 10);
   scene.add(camera);
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(()=>{
    init()
    render()
  },[])
  const init=()=>{
    // 加载hdr环境图
    const rgbeLoader = new RGBELoader();
    //资源较大，使用异步加载
    rgbeLoader.loadAsync("pic/G_Anime_2.hdr").then((texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
    //将加载的材质texture设置给背景和环境
      scene.background = texture;
      scene.environment = texture;

    // 灯光
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(light);
    //直线光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容渲染至threeDemo
    document.getElementById("threeDemo")!.appendChild(renderer.domElement);
    // // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    controls.enableDamping = true;
    });
  }
const render=()=>{
  // 轨道控制器更新(通常不用显式调用，他自己会捕捉鼠标拖动触发更新)
  controls.update();
  // 重新渲染
  renderer.render(scene, camera);
  // 每帧重新走render渲染
  requestAnimationFrame(render)
}
// 监听画面变化，更新渲染画面，响应式
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
 
  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
  });
  return (
    <>
      <div id="threeDemo" style={{position: "absolute"}} />
      <Modal visible={isModalOpen} onOk={()=>setIsModalOpen(false)} onCancel={()=>setIsModalOpen(false)}>
        <Luck />
      </Modal>
      <div onClick={()=>setIsModalOpen(true)} style={{position:"absolute"}} >asasas</div>
    </>

  )
}
export  {Vr}