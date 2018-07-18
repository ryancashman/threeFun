var scene, camera, renderer;
var geometry, material, cube;
var linemat, linegeo, line;

var pointCount = 1200;

var ljSettings = {
  freq : new THREE.Vector3( 12, 22, 12 ),
  mod : new THREE.Vector3 ( 5, 6, 4 ),
  phi : new THREE.Vector3 ( 0, 0, 0 ),
  scale : 3
}

function init (){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( { antialias : true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // material = new THREE.MeshNormalMaterial();
    // cube = new THREE.Mesh( geometry, material );

    linemat = new THREE.LineBasicMaterial( { color : 0x0000ff, linewidth : 3 } );
    // linemat = new THREE.LineBasicMaterial();
    // linegeo = new THREE.Geometry();
    // linegeo.vertices.push( new THREE.Vector3( -1, 0, 0 ) );
    // linegeo.vertices.push( new THREE.Vector3( 0, 1, 0 ) );
    // linegeo.vertices.push( new THREE.Vector3( 1, 0, 0 ) );

    linegeo = lissajous(ljSettings);
    line = new THREE.Line( linegeo, linemat );

    // scene.add( cube );
    scene.add( line );

    camera.position.z = 5;
    // camera.lookAt(new THREE.Vector3());

    //THREE.Math.mapLinear();
}

function render()
{
  renderer.render( scene, camera );
}

var camMovement = 0;
function animate() {
    requestAnimationFrame( animate );
    camMovement+=0.01;
    camera.position.x = Math.sin(camMovement)*5;
    camera.lookAt(new THREE.Vector3());
    render();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
};
