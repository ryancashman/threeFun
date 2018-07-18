var scene, camera, renderer;
var geometry, material, ljLine;
var x, y, z;

var camMovement = 0;
var pointCount = 100;

var controls;

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

function setLissajousPositions(line, phi)
{
  var positions = line.geometry.attributes.position.array;

  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    var _angle = THREE.Math.mapLinear( i, 0, pointCount, 0, Math.PI * 2 );

    positions[ index ++ ] = computeLissajousPosition(_angle, 15, 4, phi, 2);
    positions[ index ++ ] = computeLissajousPosition(_angle, 14, 5, phi*0.5, 2);
    positions[ index ++ ] = computeLissajousPosition(_angle, 11, 2, phi*0.2, 2);

  }
  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

function computeLissajousPosition(angle, freq, mod, phi, scale)
{
  return (Math.sin( angle * freq + THREE.Math.degToRad( phi ) ) * Math.cos(angle * mod ) ) * scale;
}

function animate() {
    requestAnimationFrame( animate );
    var time = Date.now() * 0.1;
    setLissajousPositions(ljLine, time);
    controls.update()
    renderer.render( scene, camera );
};
