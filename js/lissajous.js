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
