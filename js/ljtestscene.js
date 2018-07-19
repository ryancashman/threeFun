// const dat = require('dat.gui');
// const gui = new dat.GUI();
// const THREE = require('three');

//THIS CouLD ALL BE WRAPPED UP INTO A MODULE

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
const renderer = new THREE.WebGLRenderer( { antialias : true } );
// var scene, camera, renderer;
var geometry, material, ljLine;
// var x, y, z;

const camMovement = 0;
const pointCount = 1200;

// var controls;
// var gui;
const gui = new dat.GUI( {
  height : 5 * 32 - 1 } );

const ljParams = function()
{
  this.freq = [ 4, 8, 2 ],
  this.mod = [ 1, 2, 3 ],
  this.scale = [ 1, 1, 1 ],
  this.speed = [ 1, 1, 1 ],
  this.offset = 0
}

var ljp;

function initScene()
{
  //alert("Hi!");
  // x = y = z = 0;
  // scene = new THREE.Scene();
  // // camera = new THREE.PerspectiveCamera( 75, window.devicePixelRatio, 0.1, 100 );
  // camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
  // renderer = new THREE.WebGLRenderer( { antialias : true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // controls = new THREE.TrackballControls(camera, renderer.domElememnt);

}

function initGUI(){
  // gui = new dat.GUI( {
  //   height : 5 * 32 - 1 } );

  ljp = new ljParams(); // for whatever reason this needs to be a new object.

  const freq = gui.addFolder("Freq");
  Object.keys(ljp.freq).forEach((key) => {
    freq.add(ljp.freq, key, 0, 100);
  });
  freq.open();

  const mod = gui.addFolder("Mod");
  Object.keys(ljp.mod).forEach((key) => {
    mod.add(ljp.mod, key, 0, 100);
  });
  mod.open()

  const scale = gui.addFolder("Scale");
  Object.keys(ljp.scale).forEach((key) => {
    scale.add(ljp.scale, key, 0, 10);
  });
  scale.open()

  const speed = gui.addFolder("Speed");
  Object.keys(ljp.speed).forEach((key) => {
    speed.add(ljp.speed, key, 0, 10);
  });
  speed.open()

}

function start (){
    initScene();
    initGUI();

    material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth : 5 } );
    geometry = new THREE.BufferGeometry;

    const positions = new Float32Array( pointCount * 3);
    const colors = new Float32Array( pointCount * 3 );

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    ljLine = new THREE.Line( geometry, material );

    setRandomColors(ljLine, pointCount);

    geometry.computeBoundingSphere();

    scene.add( ljLine );
    camera.position.z = 5;
    camera.lookAt( new THREE.Vector3() );
}

function animate() {
    requestAnimationFrame( animate );
    ljp.offset = Date.now();
    setLissajousPositions(ljLine, ljp, pointCount, false);
    // controls.update()
    renderer.render( scene, camera );
};
