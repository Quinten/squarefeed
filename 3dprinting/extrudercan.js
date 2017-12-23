console.log('Generating extrudercan');

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
squares.push({a: [1, 3, 2], b: [1, 4, 3], d: '-z', e: false, c: 5}); // front
squares.push({a: [4, 5, 3], b: [4, 6, 5], d: '+x', e: false, c: 5}); // right
squares.push({a: [8, 2, 7], b: [8, 1, 2], d: '-x', e: false, c: 5}); // left
squares.push({a: [2, 5, 7], b: [2, 3, 5], d: '-y', e: false, c: 5}); // top
squares.push({a: [8, 4, 1], b: [8, 6, 4], d: '+y', e: false, c: 5}); // bottom
squares.push({a: [6, 7, 5], b: [6, 8, 7], d: '+z', e: false, c: 5}); // back

function checkVertices(newVertices) {
    for (var n = 0; n < newVertices.length; n++) {
        for (var v = 0; v < vertices.length; v++) {
            if (vertices[v].x == newVertices[n].x && vertices[v].y == newVertices[n].y && vertices[v].z == newVertices[n].z) {
                return false;
            }
        }
    }
    return true;
}

var size = 8;

// create extrusions
function createExtrusion(square, can) {

    if (square.e || !square.c) {
        return;
    }

    var can = square.c - 1;
    var newVertices = [];
    switch (square.d) {
        case '-y':
            newVertices.push({x: vertices[square.a[0]].x, y: vertices[square.a[0]].y - size, z: vertices[square.a[0]].z});
            newVertices.push({x: vertices[square.a[1]].x, y: vertices[square.a[1]].y - size, z: vertices[square.a[1]].z});
            newVertices.push({x: vertices[square.a[2]].x, y: vertices[square.a[2]].y - size, z: vertices[square.a[2]].z});
            newVertices.push({x: vertices[square.b[1]].x, y: vertices[square.b[1]].y - size, z: vertices[square.b[1]].z});
            if (checkVertices(newVertices)) {
                var vertexIndex = vertices.length;
                vertices.push(...newVertices);
                //console.log(vertices);
                squares.push({a: [vertexIndex, vertexIndex + 1, vertexIndex + 2], b: [vertexIndex, vertexIndex + 3, vertexIndex + 1], d: '-y', e: false, c: can}); // top
                squares.push({a: [square.a[0], vertexIndex + 3, vertexIndex], b: [square.a[0], square.b[1], vertexIndex + 3], d: '-z', e: false, c: 5}); // front
                squares.push({a: [square.a[1], vertexIndex + 2, vertexIndex + 1], b: [square.a[1], square.a[2], vertexIndex + 2], d: '+z', e: false, c: 5}); // back
                squares.push({a: [square.a[2], vertexIndex, vertexIndex + 2], b: [square.a[2], square.a[0], vertexIndex], d: '-x', e: false, c: 5}); // left
                squares.push({a: [square.b[1], vertexIndex + 1, vertexIndex + 3], b: [square.b[1], square.a[1], vertexIndex + 1], d: '+x', e: false, c: 5}); // right
                square.e = true;
            } else {
                return;
            }
            break;
        case '+y':
            newVertices.push({x: vertices[square.a[0]].x, y: vertices[square.a[0]].y + size, z: vertices[square.a[0]].z});
            newVertices.push({x: vertices[square.a[1]].x, y: vertices[square.a[1]].y + size, z: vertices[square.a[1]].z});
            newVertices.push({x: vertices[square.a[2]].x, y: vertices[square.a[2]].y + size, z: vertices[square.a[2]].z});
            newVertices.push({x: vertices[square.b[1]].x, y: vertices[square.b[1]].y + size, z: vertices[square.b[1]].z});
            if (checkVertices(newVertices)) {
                var vertexIndex = vertices.length;
                vertices.push(...newVertices);
                //console.log(vertices);
                squares.push({a: [vertexIndex, vertexIndex + 1, vertexIndex + 2], b: [vertexIndex, vertexIndex + 3, vertexIndex + 1], d: '+y', e: false, c: can}); // bottom
                squares.push({a: [square.a[0], vertexIndex + 3, vertexIndex], b: [square.a[0], square.b[1], vertexIndex + 3], d: '+z', e: false, c: 5}); // back
                squares.push({a: [square.a[1], vertexIndex + 2, vertexIndex + 1], b: [square.a[1], square.a[2], vertexIndex + 2], d: '-z', e: false, c: 5}); // front
                squares.push({a: [square.a[2], vertexIndex, vertexIndex + 2], b: [square.a[2], square.a[0], vertexIndex], d: '-x', e: false, c: 5}); // left
                squares.push({a: [square.b[1], vertexIndex + 1, vertexIndex + 3], b: [square.b[1], square.a[1], vertexIndex + 1], d: '+x', e: false, c: 5}); // right
                square.e = true;
            } else {
                return;
            }
            break;
        case '-x':
            newVertices.push({x: vertices[square.a[0]].x - size, y: vertices[square.a[0]].y, z: vertices[square.a[0]].z});
            newVertices.push({x: vertices[square.a[1]].x - size, y: vertices[square.a[1]].y, z: vertices[square.a[1]].z});
            newVertices.push({x: vertices[square.a[2]].x - size, y: vertices[square.a[2]].y, z: vertices[square.a[2]].z});
            newVertices.push({x: vertices[square.b[1]].x - size, y: vertices[square.b[1]].y, z: vertices[square.b[1]].z});
            if (checkVertices(newVertices)) {
                var vertexIndex = vertices.length;
                vertices.push(...newVertices);
                //console.log(vertices);
                squares.push({a: [vertexIndex, vertexIndex + 1, vertexIndex + 2], b: [vertexIndex, vertexIndex + 3, vertexIndex + 1], d: '-x', e: false, c: can}); // left
                squares.push({a: [square.a[0], vertexIndex + 3, vertexIndex], b: [square.a[0], square.b[1], vertexIndex + 3], d: '+y', e: false, c: 5}); // bottom
                squares.push({a: [square.a[1], vertexIndex + 2, vertexIndex + 1], b: [square.a[1], square.a[2], vertexIndex + 2], d: '-y', e: false, c: 5}); // top
                squares.push({a: [square.a[2], vertexIndex, vertexIndex + 2], b: [square.a[2], square.a[0], vertexIndex], d: '+z', e: false, c: 5}); // back
                squares.push({a: [square.b[1], vertexIndex + 1, vertexIndex + 3], b: [square.b[1], square.a[1], vertexIndex + 1], d: '-z', e: false, c: 5}); // front
                square.e = true;
            } else {
                return;
            }
            break;
        case '+x':
            newVertices.push({x: vertices[square.a[0]].x + size, y: vertices[square.a[0]].y, z: vertices[square.a[0]].z});
            newVertices.push({x: vertices[square.a[1]].x + size, y: vertices[square.a[1]].y, z: vertices[square.a[1]].z});
            newVertices.push({x: vertices[square.a[2]].x + size, y: vertices[square.a[2]].y, z: vertices[square.a[2]].z});
            newVertices.push({x: vertices[square.b[1]].x + size, y: vertices[square.b[1]].y, z: vertices[square.b[1]].z});
            if (checkVertices(newVertices)) {
                var vertexIndex = vertices.length;
                vertices.push(...newVertices);
                //console.log(vertices);
                squares.push({a: [vertexIndex, vertexIndex + 1, vertexIndex + 2], b: [vertexIndex, vertexIndex + 3, vertexIndex + 1], d: '+x', e: false, c: can}); // right
                squares.push({a: [square.a[0], vertexIndex + 3, vertexIndex], b: [square.a[0], square.b[1], vertexIndex + 3], d: '+y', e: false, c: 5}); // bottom
                squares.push({a: [square.a[1], vertexIndex + 2, vertexIndex + 1], b: [square.a[1], square.a[2], vertexIndex + 2], d: '-y', e: false, c: 5}); // top
                squares.push({a: [square.a[2], vertexIndex, vertexIndex + 2], b: [square.a[2], square.a[0], vertexIndex], d: '-z', e: false, c: 5}); // front
                squares.push({a: [square.b[1], vertexIndex + 1, vertexIndex + 3], b: [square.b[1], square.a[1], vertexIndex + 1], d: '+z', e: false, c: 5}); // back
                square.e = true;
            } else {
                return;
            }
            break;
        case '-z':
            newVertices.push({x: vertices[square.a[0]].x, y: vertices[square.a[0]].y, z: vertices[square.a[0]].z - size});
            newVertices.push({x: vertices[square.a[1]].x, y: vertices[square.a[1]].y, z: vertices[square.a[1]].z - size});
            newVertices.push({x: vertices[square.a[2]].x, y: vertices[square.a[2]].y, z: vertices[square.a[2]].z - size});
            newVertices.push({x: vertices[square.b[1]].x, y: vertices[square.b[1]].y, z: vertices[square.b[1]].z - size});
            if (checkVertices(newVertices)) {
                var vertexIndex = vertices.length;
                vertices.push(...newVertices);
                //console.log(vertices);
                squares.push({a: [vertexIndex, vertexIndex + 1, vertexIndex + 2], b: [vertexIndex, vertexIndex + 3, vertexIndex + 1], d: '-z', e: false, c: can}); // front
                squares.push({a: [square.a[0], vertexIndex + 3, vertexIndex], b: [square.a[0], square.b[1], vertexIndex + 3], d: '+y', e: false, c: 5}); // bottom
                squares.push({a: [square.a[1], vertexIndex + 2, vertexIndex + 1], b: [square.a[1], square.a[2], vertexIndex + 2], d: '-y', e: false, c: 5}); // top
                squares.push({a: [square.a[2], vertexIndex, vertexIndex + 2], b: [square.a[2], square.a[0], vertexIndex], d: '-x', e: false, c: 5}); // left
                squares.push({a: [square.b[1], vertexIndex + 1, vertexIndex + 3], b: [square.b[1], square.a[1], vertexIndex + 1], d: '+x', e: false, c: 5}); // right
                square.e = true;
            } else {
                return;
            }
            break;
        case '+z':
            newVertices.push({x: vertices[square.a[0]].x, y: vertices[square.a[0]].y, z: vertices[square.a[0]].z + size});
            newVertices.push({x: vertices[square.a[1]].x, y: vertices[square.a[1]].y, z: vertices[square.a[1]].z + size});
            newVertices.push({x: vertices[square.a[2]].x, y: vertices[square.a[2]].y, z: vertices[square.a[2]].z + size});
            newVertices.push({x: vertices[square.b[1]].x, y: vertices[square.b[1]].y, z: vertices[square.b[1]].z + size});
            if (checkVertices(newVertices)) {
                var vertexIndex = vertices.length;
                vertices.push(...newVertices);
                //console.log(vertices);
                squares.push({a: [vertexIndex, vertexIndex + 1, vertexIndex + 2], b: [vertexIndex, vertexIndex + 3, vertexIndex + 1], d: '+z', e: false, c: can}); // back
                squares.push({a: [square.a[0], vertexIndex + 3, vertexIndex], b: [square.a[0], square.b[1], vertexIndex + 3], d: '+y', e: false, c: 5}); // bottom
                squares.push({a: [square.a[1], vertexIndex + 2, vertexIndex + 1], b: [square.a[1], square.a[2], vertexIndex + 2], d: '-y', e: false, c: 5}); // top
                squares.push({a: [square.a[2], vertexIndex, vertexIndex + 2], b: [square.a[2], square.a[0], vertexIndex], d: '+x', e: false, c: 5}); // right
                squares.push({a: [square.b[1], vertexIndex + 1, vertexIndex + 3], b: [square.b[1], square.a[1], vertexIndex + 1], d: '-x', e: false, c: 5}); // left
                square.e = true;
            } else {
                return;
            }
            break;
    }
}

//createExtrusion(squares[3]);
//createExtrusion(squares[6]);

//createExtrusion(squares[4]);
//createExtrusion(squares[6]);

//createExtrusion(squares[2]);

//createExtrusion(squares[1]);

//createExtrusion(squares[0]);

//createExtrusion(squares[5]);

for (var i = 0; i < 1024; i++) {
    var squaresIndex = squares.length;
    createExtrusion(squares[Math.floor(Math.random() * squaresIndex)]);
}


// write to file
var data = '#extrusionscan\n';

for (var v = 1; v < vertices.length; v++) {
    data += 'v ' + vertices[v].x + ' ' + vertices[v].y + ' ' + vertices[v].z + '\n';
}

for (var s = 0; s < squares.length; s++) {
    if (!squares[s].e) {
        data += 'f ' + squares[s].a[0] + ' ' + squares[s].a[1] + ' ' + squares[s].a[2] + '\n';
        data += 'f ' + squares[s].b[0] + ' ' + squares[s].b[1] + ' ' + squares[s].b[2] + '\n';
    }
}

var fs = require('fs');
fs.writeFile('models/extrusionscan.obj', data);

console.log('Done!');
