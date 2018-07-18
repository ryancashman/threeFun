// const dat = require('dat.gui');
// const gui = new dat.GUI();
// const THREE = require('three');

var scene, camera, renderer;
var geometry, material, ljLine;
var x, y, z;

var camMovement = 0;
var pointCount = 1200;

var controls;
var gui;

var params = function()
{
  this.message = "yo yo yo!";
  this.a = 12;
  this.b = 42;
};

var ljSettings = {
  freq : new THREE.Vector3( 5, 6, 3 ),
  mod : new THREE.Vector3 ( 2, 2, 1 ),
  scale : 3
}

function init()
{
  x = y = z = 0;
  scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera( 75, window.devicePixelRatio, 0.1, 100 );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
  renderer = new THREE.WebGLRenderer( { antialias : true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // controls = new THREE.TrackballControls(camera, renderer.domElememnt);

  gui = new dat.GUI( {
    height : 5 * 32 - 1 } );

  gp = new params();

  gui.add(gp, 'a', 0, 1000).name("ParmX");
  gui.add(gp, 'b', 12, 100).name("ParmY");
  gui.add(gp, 'message').name("MSG Z");
  //gui.open();
}

function start (){
    init();

    material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth : 5 } );
    geometry = new THREE.BufferGeometry;

    var positions = new Float32Array( pointCount * 3);
    var colors = new Float32Array( pointCount * 3 );

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    ljLine = new THREE.Line( geometry, material );

    setRandomColors(ljLine);

    geometry.computeBoundingSphere();

    scene.add( ljLine );
    camera.position.z = 5;
    camera.lookAt( new THREE.Vector3() );
}

function setRandomColors(line)
{
  var colors = line.geometry.attributes.color.array;
  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    colors[ index ++ ] = Math.random();
    colors[ index ++ ] = Math.random();
    colors[ index ++ ] = Math.random();
  }
  line.geometry.attributes.color.needsUpdate = true; // VERY IMPORTANT!!
}

function animate() {
    requestAnimationFrame( animate );
    var time = Date.now() * 0.1;
    setLissajousPositions(ljLine, time, ljSettings);
    // controls.update()
    renderer.render( scene, camera );
};
