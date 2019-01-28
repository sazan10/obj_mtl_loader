import React, { Component } from 'react';
import * as THREE from 'three';
import * as TrackballControls from 'three-trackballcontrols';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
//import  MTLLoader from 'three-mtl-loader';
//import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);
class ThreeScene extends Component{
  componentDidMount(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    //ADD CAMERA
      this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.z = 20;

      //ADD SCENE

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);


    //ADD CUBE

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [65, 83, 68];


    var ambient = new THREE.AmbientLight(0xbbbbbb);
    this.scene.add(ambient);

 var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0, 1);
  this.scene.add(directionalLight);

    // add to the scene

   let mtlLoader= new MTLLoader();
   let objLoader= new OBJLoader();
  // mtlLoader.setTexturePath('/assets/');
///mtlLoader.setPath('/assets/');
mtlLoader.load('https://secure-shelf-35241.herokuapp.com/images/mtl', (materials) => {
 // mtlLoader.load('./mtl.mtl', (materials) => {  
//console.log("mtl loaded");
 
  materials.preload();
  console.log("material s aare : "+ mtlLoader);
  
  
//objLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/286022/Bulbasaur.obj',(object,material) => {
  objLoader.setMaterials(materials);
 //objLoader.load('r2-d2.obj',(object) => {
 // this.objLoader.setPath('/assets/');
  //this.objLoader.load('./obj.obj', (object)=> {
 objLoader.load('https://secure-shelf-35241.herokuapp.com/images/obj',(object) => {    
    console.log(object);
    this.scene.add( object );    

    // object.material.color=new THREE.Color(0X00FF00)
  //  this.banana = object;
  //  this.banana.rotation.x = Math.PI/2;
  //  this.banana.position.y = -200;
  //  this.banana.position.z = 50;
     
  // object.traverse( function ( child ) {
  //   if ( child instanceof THREE.Mesh ) {
  //        child.material.ambient.setHex(0xFF0000);
  //        child.material.color.setHex(0x00FF00);
  //        console.log("color changed")
  //       }
  //       else {console.log("not child of mesh")};
  //   } );
 
object.position.y -= 0;

    console.log("object added");
  },null,(event)=>{
    console.log("error in retrieving obj");
  });
  
  });

  // this.THREE=THREE;
  // var loader = new OBJLoader();
  //   loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/286022/Bulbasaur.obj', (object)=> {
  //     object.scale.x = 45;
  //     object.scale.y = 45;
  //     object.scale.z = 45;
  //     object.rotation.y = 3;
  //     object.position.y = -10.5;
  //     this.scene.add(object);
  //     this.scene.add(object);
  //   });

//   let mtlLoader = new MTLLoader();
//   mtlLoader.setPath('./assets/');
//   mtlLoader.load('test.mtl',(matl) => {
//
//     matl.preload();
// let objLoader= new objLoader();
//     objLoader.setMaterials(matl);
//     objLoader.setPath('./assets/');
//     objLoader.load('test.obj',(object)=>
//   {
//     this.scene.add(object);
//     object.position.y-=60;
//   })
//     //do something with matl
//   });

this.start();

  }

componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene,this.camera);
    }
  }

stop = () => {
    cancelAnimationFrame(this.frameId);
  }

animate = () => {
  this.controls.update();


   this.renderScene();
   this.frameId = window.requestAnimationFrame(this.animate);
 }

renderScene = () => {
  this.renderer.render(this.scene, this.camera);
}

render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    );
  }
}

export default ThreeScene;
