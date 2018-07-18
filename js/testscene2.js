var scene, camera, renderer;
var geometry, material, line;
var x, y, z;

var camMovement = 0;
var pointCount = 50000;
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

    setColors();
    geometry.computeBoundingSphere();

    scene.add( line );
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3());
}

function setColors()
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

function updatePositions()
{
  var positions = line.geometry.attributes.position.array;

  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    positions[ index ++ ] = x;
    positions[ index ++ ] = y;
    positions[ index ++ ] = z;

    x = Math.random() * (Math.random() > 0.5 ? 2 : -2);
    y = Math.random() * (Math.random() > 0.5 ? 2 : -2);
    z = Math.random() * (Math.random() > 0.5 ? 2 : -2);
  }

  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

function animate() {
    requestAnimationFrame( animate );
    //camMovement+=0.01;
    updatePositions();

//    camera.position.x = Math.sin(camMovement)*5;
    // camera.lookAt(new THREE.Vector3());
    renderer.render( scene, camera );
};
