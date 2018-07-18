function setLissajousPositions(line, phi, settings)
{
  var positions = line.geometry.attributes.position.array;

  var index = 0;
  for (var i = 0; i < pointCount; i ++ ) {
    var _angle = THREE.Math.mapLinear( ( i == pointCount - 1 ? 0 : i ) , 0, pointCount, 0, Math.PI * 2 );

    positions[ index ++ ] = computeLissajousPosition(_angle, settings.freq.x, settings.mod.x, phi, settings.scale);
    positions[ index ++ ] = computeLissajousPosition(_angle, settings.freq.y, settings.mod.y, phi*0.5, settings.scale);
    positions[ index ++ ] = computeLissajousPosition(_angle, settings.freq.z, settings.mod.z, phi*0.2, settings.scale);

  }
  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

function computeLissajousPosition(angle, freq, mod, phi, scale)
{
  return (Math.sin( angle * freq + THREE.Math.degToRad( phi ) ) * Math.cos(angle * mod ) ) * scale;
}
