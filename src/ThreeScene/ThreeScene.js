import React, {
  Component
} from 'react';
import * as THREE from 'three';
import * as TrackballControls from 'three-trackballcontrols';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
//import  MTLLoader from 'three-mtl-loader';
//import OBJLoader from 'three-obj-loader';
import GLTFLoader from 'three-gltf-loader';

class ThreeScene extends Component {
  componentDidMount() {
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
    this.camera.position.z = 300;

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

    let loader = new GLTFLoader();
  //   loader.load('https://secure-shelf-35241.herokuapp.com/images/glb',(gltf)=>{
  //  // loader.load('../assets/spirit.glb', (gltf) => {

  //     gltf.scale.x=100;

  //     this.scene.add(gltf.scene);

  //   }, null, (error) => {
  //     console.log("error in retrieving obj", error);
  //   });

    // this.THREE=THREE;
    //var loader = new OBJLoader();
     // loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/286022/Bulbasaur.obj', (object)=> {
      loader.load('https://secure-shelf-35241.herokuapp.com/images/glb',(object1)=>{  
       var object = object1;
     //object.scale.x = 45;
       // object.scale.y = 45;
        //object.scale.z = 45;
        object.rotation.y = 3;
        object.position.y = -10.5;
        this.scene.add(object);
        this.scene.add(object);
      });

    //   let mtlLoader = new MTLLoader();
    //   mtlLoader.setPath('./assets/');
    //   mtlLoader.load('test.mtl',(matl) => {
    
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

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
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

  render() {
    return ( <
      div style = {
        {
          width: '400px',
          height: '400px'
        }
      }
      ref = {
        (mount) => {
          this.mount = mount
        }
      }
      />
    );
  }
}

export default ThreeScene;