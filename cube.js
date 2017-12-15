console.log('Generating cube');

var vertices = [];

vertices.push({x: 0, y: 0, z: 0}); // first vertex is skipped, obj vertex indices start at 1
vertices.push({x: -4, y: 4, z: -4});
vertices.push({x: -4, y: -4, z: -4});
vertices.push({x: 4, y: -4, z: -4});
vertices.push({x: 4, y: 4, z: -4});
vertices.push({x: 4, y: -4, z: 4});
vertices.push({x: 4, y: 4, z: 4});
vertices.push({x: -4, y: -4, z: 4});
vertices.push({x: -4, y: 4, z: 4});

var squares = [];
squares.push({a: [1, 3, 2], b: [1, 4, 3]}); // front
squares.push({a: [4, 5, 3], b: [4, 6, 5]}); // right
squares.push({a: [8, 2, 7], b: [8, 1, 2]}); // left
squares.push({a: [2, 5, 7], b: [2, 3, 5]}); // top
squares.push({a: [8, 4, 1], b: [8, 6, 4]}); // bottom
squares.push({a: [6, 7, 5], b: [6, 8, 7]}); // back

var data = '#cube 2.0\n';

for (var v = 1; v < vertices.length; v++) {
    data += 'v ' + vertices[v].x + ' ' + vertices[v].y + ' ' + vertices[v].z + '\n';
}

for (var s = 0; s < squares.length; s++) {
    data += 'f ' + squares[s].a[0] + ' ' + squares[s].a[1] + ' ' + squares[s].a[2] + '\n';
    data += 'f ' + squares[s].b[0] + ' ' + squares[s].b[1] + ' ' + squares[s].b[2] + '\n';
}

var fs = require('fs');
fs.writeFile('models/cube.obj', data);
