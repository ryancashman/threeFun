// Lissajous Figures By Ryan Cashman
// nanoanimal.com

/* 

globals THREE dat Float32Array lissajousModule 

*/

var camMovement = 0;
var pointCount = 2400;
var scene, camera, renderer, gui;
var geometry, material, positions, colors;
var ljp;
var ljLine;

function lissajousParams(params)
{
  this.freq = params.freq || [ 14, 18, 12 ];
  this.mod = params.mod || [ 5, 7, 9 ];
  this.scale = params.scale || [ 1, 1, 1 ];
  this.speed = params.speed || [ 0.1, 0.3, 0.4];
  this.offset = params.offset || 0;
  this.pointCount = params.pointCount || 500;
  this.maxPoints = params.maxPoints || 3000;
}

function initScene(){
  gui = new dat.GUI();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
  renderer = new THREE.WebGLRenderer( { antialias : true } );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  camera.position.z = 3;
  camera.lookAt( new THREE.Vector3() );
  
  ljp = new lissajousParams({
    freq: [ 23, 24, 25 ],
    mod: [ 1, 3, 5 ]
  });
  
  material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth : 1 } );
  //line width is always 1, limitation of three.js and ANGLE layer
  geometry = new THREE.BufferGeometry;
  positions = new Float32Array( ljp.maxPoints * 3);
  colors = new Float32Array( ljp.maxPoints * 3 );

  
  
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

  ljLine = new THREE.Line( geometry, material );

  lissajousModule.randomColors(ljLine, ljp.maxPoints);

  geometry.computeBoundingSphere();
  scene.add( ljLine );
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize()
{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function initGUI(){
  
  function setName(k){
    return k==='0'?'x':k==='1'?'y':'z';
  }
  
  gui.add(ljp, 'pointCount', 3, ljp.maxPoints).name('Point Count');
  
  const freq = gui.addFolder("Frequency");
  Object.keys(ljp.freq).forEach((key) => {
    freq.add(ljp.freq, key, 0, 100).name(setName(key));
  });
  freq.open();

  const mod = gui.addFolder("Modulation");
  Object.keys(ljp.mod).forEach((key) => {
    mod.add(ljp.mod, key, 0, 100).name(setName(key));
  });
  mod.open()

  const scale = gui.addFolder("Scale");
  Object.keys(ljp.scale).forEach((key) => {
    scale.add(ljp.scale, key, 0, 10).name(setName(key));
  });
  scale.open()

  const speed = gui.addFolder("Speed");
  Object.keys(ljp.speed).forEach((key) => {
    speed.add(ljp.speed, key, -1, 1).name(setName(key));
  });
  speed.open()
  
}

function init (){
    initScene();
    initGUI();
}

function animate() {
  requestAnimationFrame( animate );
  ljp.offset = Date.now();
  lissajousModule.updatePoints(ljLine, ljp, false);
  renderer.render( scene, camera );
};

init();
animate();