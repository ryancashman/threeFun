function setLissajousPositions(line, params, maxPoints, closed)
{
  const _positions = line.geometry.attributes.position.array;
  var _index = 0;
  for (var i = 0; i < maxPoints; i ++ ) {
    var _angle = THREE.Math.mapLinear( ( (closed && i == maxPoints - 1) ? 0 : i ) , 0, maxPoints, 0, Math.PI * 2 );
    for ( var j = 0; j <= 2; j++ )
    {
      _positions[ _index ++ ] = computeLissajousPosition( _angle, params.freq[j], params.mod[j], params.offset * params.speed[j], params.scale[j] );
      // _positions [ _index ++ ] = ( Math.sin( _angle * params.freq[j] + THREE.Math.degToRad( params.offset * params.speed[j] ) ) * Math.cos(_angle * params.mod[j] ) ) * params.scale[j];
    }
  }
  line.geometry.attributes.position.needsUpdate = true; // VERY IMPORTANT!!
}

//could be collapsed into above function...
function computeLissajousPosition(angle, freq, mod, phi, scale)
{
  return ( Math.sin( angle * freq + THREE.Math.degToRad( phi ) ) * Math.cos( angle * mod ) ) * scale;
}

function setRandomColors(line, maxPoints)
{
  const colors = line.geometry.attributes.color.array;
  var index = 0;
  for (var i = 0; i < maxPoints; i ++ ) {
    for ( var j = 0; j <= 2; j ++ )
    {
      colors[ index ++ ] = Math.random();
    }
  }
  line.geometry.attributes.color.needsUpdate = true; // VERY IMPORTANT!!
}
