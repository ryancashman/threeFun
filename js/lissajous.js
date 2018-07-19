function setLissajousPositions(line, params, maxPoints, closed)
{
  const _positions = line.geometry.attributes.position.array;

  var _index = 0;
  for (var i = 0; i < maxPoints; i ++ ) {
    var _angle = THREE.Math.mapLinear( ( (closed && i == maxPoints - 1) ? 0 : i ) , 0, maxPoints, 0, Math.PI * 2 );
//Could be a loop
    _positions[ _index ++ ] = computeLissajousPosition( _angle, params.freq[0], params.mod[0], params.offset * params.speed[0], params.scale[0] );
    _positions[ _index ++ ] = computeLissajousPosition( _angle, params.freq[1], params.mod[1], params.offset * params.speed[1], params.scale[1] );
    _positions[ _index ++ ] = computeLissajousPosition( _angle, params.freq[2], params.mod[2], params.offset * params.speed[2], params.scale[2] );

  }
  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

function computeLissajousPosition(angle, freq, mod, phi, scale)
{
  return (Math.sin( angle * freq + THREE.Math.degToRad( phi ) ) * Math.cos(angle * mod ) ) * scale;
}

function setRandomColors(line, maxPoints)
{
  const colors = line.geometry.attributes.color.array;
  var index = 0;
  for (var i = 0; i < maxPoints; i ++ ) {
    colors[ index ++ ] = Math.random();
    colors[ index ++ ] = Math.random();
    colors[ index ++ ] = Math.random();
  }
  line.geometry.attributes.color.needsUpdate = true; // VERY IMPORTANT!!
}
