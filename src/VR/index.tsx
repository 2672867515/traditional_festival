import { Button, Modal, Tooltip, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
 //导入hdr图像加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";//rgbe加载器
import Luck from '../praise/index.tsx'
import './vr3.less'
import { LeftCircleOutlined,RightCircleOutlined,RightSquareOutlined } from '@ant-design/icons';

const Vr=(props)=>{
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
   camera.position.set(0, 20, 30);
   scene.add(camera);
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 加载hdr环境图
    const rgbeLoader = new RGBELoader();
    // 灯光 环境光
    let light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    // 直线光源
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEnv,setCurrentEnv]=useState(0)
    const [envArr, setEnvArr] = useState([
      "pic/G_Anime_2.hdr",
      "pic/G_Anime_3.hdr",
      "pic/G_Anime_4.hdr",
      "pic/G_Anime_5.hdr",
      "pic/G_Anime_11.hdr",
      "pic/G_Anime_12.hdr"
  ]);
  useEffect(()=>{
    init()
    render()
  },[])
  useEffect(()=>{
    removeLight()
    init()
    render()
  },[currentEnv])

  // 加载环境
  const loadEnv=(url)=>{
    // 删除原有的场景
    if(document.getElementById("threeDemo")!.firstChild){
      document.getElementById("threeDemo")!.removeChild( document.getElementById("threeDemo").firstChild)
    }
    //资源较大，使用异步加载
    rgbeLoader.loadAsync(url).then((texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
    //将加载的材质texture设置给背景和环境
      scene.background = texture;
      scene.environment = texture;
    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容渲染至threeDemo
    document.getElementById("threeDemo")!.appendChild(renderer.domElement);
    //  使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    controls.enableDamping = true;

  });
  }
  // 添加光源
  const addLight=()=>{
    // 灯光 环境光
    scene.add(light);
    //直线光源
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
  }
  //删除光源
  const removeLight=()=>{
    // 灯光 环境光
    scene.remove(light);
    //直线光源
    scene.remove(directionalLight);
  }
  const init=()=>{
    // 加载环境
    loadEnv(envArr[currentEnv])
    addLight()
    scene.add(ball1);
    scene.add(ball2);
    scene.add(ball3);
  }
  const render=()=>{
    // 使场景中的物体进行旋转
    scene.rotation.y += 0.0003;
    camera.position.x+=0.005;
    // 轨道控制器更新(通常不用显式调用，他自己会捕捉鼠标拖动触发更新)
    controls.update();
    // 重新渲染
    renderer.render(scene, camera);
    // 每帧重新走render渲染
    requestAnimationFrame(render)
  }
 // 造球
  const  createBox=(pos, radius, color,name)=> {
    const geometry = new THREE.IcosahedronBufferGeometry( radius, 10 );
    const object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0x808080,transparent: false, side: THREE.DoubleSide }) );
    object.name = name
    object.material.color.r = color[0] / 255;
    object.material.color.g = color[1] / 255;
    object.material.color.b = color[2] / 255;
    object.material.opacity = 1;
    object.position.x = pos.x;
    object.position.y = pos.y;
    object.position.z = pos.z;
    object.shapeType = 'ball';
    return object;
  }
  const ball1 = createBox({x:5,y:15,z:3},  3, [25,100,50],"ball1");
  let ball2 = createBox({x:3,y:15,z:5},  3, [125,10,90],"ball2");
  let ball3 = createBox({x:3,y:15,z:7},  3, [50,60,210],"ball3");

  // 使用射线（ray）来代表从摄像机（或其他点）发出的一条线。
  // Raycaster 允许我们检测这条射线与场景中的物体是否相交
  // 并且可以获取到交点的信息。
  // 创建一个Raycaster对象
  const raycaster = new THREE.Raycaster();

  // 初始化拖拽变量
  // let isDragging = false;
  // let selectedObject = null;
  // let offset = new THREE.Vector3();

  // 使用GLTFLoader加载模型
  const loader = new GLTFLoader();
  loader.load('model/judy.glb', (glb) => {
      // 从加载完成的glb对象中获取模型网格
      const modelMesh = glb.scene.children[0];
      modelMesh.name="Judy"
      // console.log(glb.scene.children[0]);
      // 设置模型的位置、缩放、旋转等属性
      modelMesh.position.set(10, 2, 15);
      modelMesh.scale.set(2,2,2);
      // modelMesh.rotation.set(0, Math.PI / 2, 0);

      // 将模型网格添加到场景中
      scene.add(modelMesh);
      
  });
  loader.load('model/car/scene.gltf', (gltf) => {
    // 从加载完成的gltf对象中获取模型网格
      const modelMesh = gltf.scene.children[0];
      modelMesh.name="car"
      // console.log(gltf.scene.children[0]);
      // 设置模型的位置、缩放、旋转等属性
      modelMesh.position.set(20, 2, 15);
      modelMesh.scale.set(2, 2, 2);
      // modelMesh.rotation.set(0, Math.PI / 2, 0);

      // 将模型网格添加到场景中
      scene.add(modelMesh);
      
  });
  loader.load('model/dragon/scene.gltf', (gltf) => {
    // 从加载完成的gltf对象中获取模型网格
      const modelMesh = gltf.scene.children[0];
      modelMesh.name="dragon"
      // console.log(gltf.scene.children[0]);
      // 设置模型的位置、缩放、旋转等属性
      modelMesh.position.set(0, 2, 15);
      modelMesh.scale.set(2, 2, 2);
      // modelMesh.rotation.set(0, Math.PI / 2, 0);

      // 将模型网格添加到场景中
      scene.add(modelMesh);
      
  });

  //切换环境 
  const preEnv=()=>{
    if(currentEnv!==0){
      let current=currentEnv-1
      setCurrentEnv(current)
    }else{
      console.log(111);
      
      messageApi.open({
        type: 'warning',
        content: '没了',
      });
    }
  }
  const nextEnv=()=>{
    if(currentEnv!==5){
      let current=currentEnv+1
      setCurrentEnv(current)
    }else{
      messageApi.open({
        type: 'warning',
        content: '没了',
      });
    }
  }
  const next=()=>{
    props.history.push('/Page2')
  }
// 在鼠标按下时触发
// function onMouseDown(event) {
//   const mouse = new THREE.Vector2(
//     (event.clientX / window.innerWidth) * 2 - 1,
//     -(event.clientY / window.innerHeight) * 2 + 1
//   );
  
//   // 从相机发出一条射线，经过鼠标位置
//   raycaster.setFromCamera(mouse, camera);

//   // 检测射线与场景中的物体相交
//   const intersects = raycaster.intersectObjects(scene.children);

//   // 如果有相交的物体，选择第一个相交的物体进行拖拽
//   if (intersects.length > 0) {
//     isDragging = true;
//     selectedObject = intersects[0].object;

//     // 计算选中点与物体中心的偏移
//     const intersectionPoint = intersects[0].point;
//     offset.copy(intersectionPoint).sub(selectedObject.position);
//   }
// }

// 在鼠标移动时触发
// function onMouseMove(event) {
//   if (isDragging) {
//     const mouse = new THREE.Vector2(
//       (event.clientX / window.innerWidth) * 2 - 1,
//       -(event.clientY / window.innerHeight) * 2 + 1
//     );

//     // 从相机发出一条射线，经过鼠标位置
//     raycaster.setFromCamera(mouse, camera);

//     // 计算射线与平面的交点
//     const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
//     const intersection = new THREE.Vector3();
//     raycaster.ray.intersectPlane(plane, intersection);

//     // 移动选中的物体到交点位置
//     selectedObject.position.copy(intersection.sub(offset));
//   }
// }

// 在鼠标抬起时触发
// function onMouseUp() {
//   isDragging = false;
//   selectedObject = null;
// }

// 添加鼠标事件监听器
// window.addEventListener("mousedown", onMouseDown, false);
// window.addEventListener("mousemove", onMouseMove, false);
// window.addEventListener("mouseup", onMouseUp, false);

// 鼠标点击事件
function onMouseClick(event) {
  // 根据屏幕坐标计算鼠标点击位置
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // 从相机发出一条射线，经过鼠标位置
  raycaster.setFromCamera(mouse, camera);
  // 检查射线和对象的相交情况
  const intersects = raycaster.intersectObjects(scene.children);

  // 如果有相交的对象
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log(clickedObject);

    // 检查被点击的对象的名称
    if (clickedObject.name === "ball1") {
      // 这里执行与对象交互相关的操作
      setIsModalOpen(true)
    }
    if (clickedObject.name === "Judy") {
      // 这里执行与对象交互相关的操作
      console.log(1111);
      
    }
    if (clickedObject.name === "ball2") {
      // 这里执行与对象交互相关的操作
      const r=Math.random()*255
      const g=Math.random()*255
      const b=Math.random()*255
      scene.remove(ball2);
      ball2 = createBox({x:3,y:5,z:5},  3, [r,g,b],"ball2");
      scene.add(ball2)
    }
  }
}
// 监听鼠标点击事件
window.addEventListener("click", onMouseClick, false);
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
      <div id="threeDemo" style={{position: "absolute"}}>
      </div>
      <div className="operation">
      <Tooltip title="上一个场景">
        <Button type="dashed" shape="circle" icon={<LeftCircleOutlined />} onClick={()=>preEnv()} />
      </Tooltip>
      <Tooltip title="下一个场景">
        <Button type="dashed" shape="circle" icon={<RightCircleOutlined />} onClick={()=>nextEnv()} />
      </Tooltip>
      <Tooltip title="跳">
        <Button type="dashed" shape="circle" icon={<RightSquareOutlined />} onClick={()=>next()} />
      </Tooltip>
      </div>

      <Modal visible={isModalOpen} onOk={()=>setIsModalOpen(false)} onCancel={()=>setIsModalOpen(false)}>
        <Luck />
      </Modal>
    </>

  )
}
export default Vr