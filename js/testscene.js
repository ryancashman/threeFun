var scene, camera, renderer;
var geometry, material, cube;
var linemat, linegeo, line;

function init (){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( { antialias : true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh( geometry, material );

    linemat = new THREE.LineBasicMaterial( { color : 0x0000ff, linewidth : 3 } );
    // linemat = new THREE.LineBasicMaterial();
    linegeo = new THREE.Geometry();
    linegeo.vertices.push( new THREE.Vector3( -1, 0, 0 ) );
    linegeo.vertices.push( new THREE.Vector3( 0, 1, 0 ) );
    linegeo.vertices.push( new THREE.Vector3( 1, 0, 0 ) );

    line = new THREE.Line( linegeo, linemat );

    scene.add( cube );
    scene.add( line );

    camera.position.z = 5;

    //THREE.Math.mapLinear();
}

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};
