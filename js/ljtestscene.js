
//THIS CouLD ALL BE WRAPPED UP INTO A MODULE?

var sceneModule = ( function() {
  //private
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
  const renderer = new THREE.WebGLRenderer( { antialias : true } );
  //public
  return{

    init : function(){
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
      camera.position.z = 5;
      camera.lookAt( new THREE.Vector3() );
    },

    add : function( geo )
    {
      scene.add( geo );
    },

    render : function(){
      renderer.render( scene, camera );
    }

  };
} )();

//var geometry, material, ljLine;
var ljLine;

const camMovement = 0;
const pointCount = 2400;

const gui = new dat.GUI();

const ljParams = function()
{
  this.freq = [ 4, 8, 2 ],
  this.mod = [ 1, 2, 3 ],
  this.scale = [ 1, 1, 1 ],
  this.speed = [ .1, .1, .1 ],
  this.offset = 0
}

var ljp;

function initGUI(){
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
    speed.add(ljp.speed, key, 0, 1);
  });
  speed.open()

}

function start (){
    sceneModule.init();
    initGUI();

    const material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth : 5 } );
    const geometry = new THREE.BufferGeometry;

    const positions = new Float32Array( pointCount * 3);
    const colors = new Float32Array( pointCount * 3 );

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

    ljLine = new THREE.Line( geometry, material );

    lissajousModule.randomColors(ljLine, pointCount);

    geometry.computeBoundingSphere();

    sceneModule.add( ljLine );

}

function animate() {
    requestAnimationFrame( animate );
    ljp.offset = Date.now();
    lissajousModule.updatePoints(ljLine, ljp, pointCount, false);
    sceneModule.render();
};
