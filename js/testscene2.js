var scene, camera, renderer;
var geometry, material, line;
var x, y, z;

var camMovement = 0;
var pointCount = 10000;

var controls;
//
// var ljSettings = {
//   freq : new THREE.Vector3( 12, 22, 12 ),
//   mod : new THREE.Vector3 ( 5, 6, 4 ),
//   phi : new THREE.Vector3 ( 0, 0, 0 ),
//   scale : 3
// }

function init()
{
  x = y = z = 0;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.devicePixelRatio, 0.1, 100 );
  renderer = new THREE.WebGLRenderer( { antialias : true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  controls = new THREE.TrackballControls(camera, renderer.domElememnt);
}

function start (){
    init();

    //material = new THREE.LineBasicMaterial( { color : 0x0000ff, linewidth : 3 } );
    material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth : 5 } );
    geometry = new THREE.BufferGeometry;

    var positions = new Float32Array( pointCount * 3);
    var colors = new Float32Array( pointCount * 3 );

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    //geometry.setDrawRange(0, pointCount-1); // might not be needed if drawing all?
    line = new THREE.Line( geometry, material );

    setRandomColors();

    geometry.computeBoundingSphere();

    scene.add( line );
    camera.position.z = 5;
    camera.lookAt( new THREE.Vector3() );
}

function setRandomColors()
{
  var colors = line.geometry.attributes.color.array;
  var u = v = w = 0.1;
  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    colors[ index ++ ] = u;
    colors[ index ++ ] = v;
    colors[ index ++ ] = w;

    u = Math.random();
    v = Math.random();
    w = Math.random();
  }

  line.geometry.attributes.color.needsUpdate = true; // VERY IMPORTANT!!
}

function randomPositions()
{
  var positions = line.geometry.attributes.position.array;

  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    positions[ index ++ ] = x;
    positions[ index ++ ] = y;
    positions[ index ++ ] = z;

    x = Math.random() * ( Math.random() > 0.5 ? 2 : -2 );
    y = Math.random() * ( Math.random() > 0.5 ? 2 : -2 );
    z = Math.random() * ( Math.random() > 0.5 ? 2 : -2 );
  }

  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

function setLissajousPositions(phi)
{
  var positions = line.geometry.attributes.position.array;

  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    var _angle = THREE.Math.mapLinear( i, 0, pointCount, 0, Math.PI * 2 );

    positions[ index ++ ] = computeLissajousPosition(_angle, 22, 8, phi, 2);
    positions[ index ++ ] = computeLissajousPosition(_angle, 14, 5, phi, 2);
    positions[ index ++ ] = computeLissajousPosition(_angle, 16, 4, phi, 2);

  }
  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

function computeLissajousPosition(angle, freq, mod, phi, scale)
{
  return (Math.sin( angle * freq + THREE.Math.degToRad( phi ) ) * Math.cos(angle * mod ) ) * scale;
}

function animate() {
    requestAnimationFrame( animate );
    //camMovement+=0.01;
    // randomPositions();
    var time = Date.now() * 0.1;
    setLissajousPositions(time);
    controls.update()
//    camera.position.x = Math.sin(camMovement)*5;
    // camera.lookAt(new THREE.Vector3());
    renderer.render( scene, camera );
};
