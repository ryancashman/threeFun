
// var pointCount = 100;
//
// var ljSettings = {
//   freq : new THREE.Vector3( 1, 2, 3 ),
//   mod : new THREE.Vector3 ( 2, 3, 4 ),
//   phi : new THREE.Vector3 ( 1, 2, 3 ),
//   scale : 3
// }

function ljPos(angle, lj)
{
  var pos = new THREE.Vector3();
  pos.x = ( Math.sin( angle * lj.freq.x + THREE.Math.degToRad( lj.phi.x ) ) * Math.cos(angle * lj.mod.x ) ) * lj.scale;
  pos.y = ( Math.sin( angle * lj.freq.y + THREE.Math.degToRad( lj.phi.y ) ) * Math.cos(angle * lj.mod.y ) ) * lj.scale;
  pos.z = ( Math.sin( angle * lj.freq.z + THREE.Math.degToRad( lj.phi.z ) ) * Math.cos(angle * lj.mod.z ) ) * lj.scale;
  console.log(pos);
  return pos;
}

function lissajous(lj)
{
  var _geo = new THREE.Geometry();
  for (var p = 0; p < pointCount; p++)
  {
    var _angle = THREE.Math.mapLinear( p, 0, pointCount, 0, Math.PI * 2 );
    _geo.vertices.push(ljPos(_angle, lj));
  }
  return _geo;
}
