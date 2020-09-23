const vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  '',
  'void main()',
  '{',
  '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}'
].join('\n');

const fragmentShaderText = [
  'precision mediump float;',
  '',
  'void main()',
  '{',
  '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
  '}'
].join('\n');

const initDemo = function () {
  console.log('this is working');

  const canvas = document.getElementById('game-surface');
  const gl = canvas.getContext('webgl');

  if (!gl) {
    console.log('WebGL not supported, falling back on experimental')
    gl = canvas.getContext('experimental-webgl'); // for IE
  }

  if (!gl) {
    alert('your browser does not support WebGL');
  }

  gl.clearColor(0.75, 0.85, 0.8, 1.0); // Setting color (RGB)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // render

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl.getProgramInfoLog(program));
    return;
  }

  //
  // Create Buffer
  //
  const triangleVerctices = [
    // X, Y
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ];

  const triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerctices), gl.STATIC_DRAW);

  const positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttributePointer(
    positionAttribLocation, // Attribute location
    2, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttributeArray(positionAttributeLocation);


  //
  // Main render loop
  //

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};