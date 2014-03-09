# space-vec3

A 3d space class based on the [vec3](https://npmjs.org/package/vec3) package. Space instances will contain a vec3 **dimensions** field, and a Array of Arrays of Arrays **matrix**.

## Installation

    npm install space-vec3

## Usage
    
    var s = require("space-vec3");

    // using the s object:
    var space1 = s(s.vec3(5,7,11));    // a 5x7x11 matrix filled with 0s
    var space2 = s(s.vec3(5,7,11), 9); // a 5x7x11 matrix filled with 9s
    var space3 = s([[[1,2]],[[3,4]]]); // a 2x2x1  matrix

    // directly from the Space class:
    var space4 = s.Space(s.vec3(5,7,11));          // same as space1
    var space5 = s.Space.parse([[[1,2]],[[3,4]]]); // same as space3
    var space6 = s.Space.identity(3);              // a 3x3x3 matrix filled with 0s except for the main diagonal, which is filled with 1s

## Notice
The space matrices are stored as in the YZX convention. They are not in the XYZ format. So, if you ever need to iterate over a Space.matrix, the best way to do it is as follow:

    for(var y = 0; y < spaceN.dimensions.y; y++)
        for(var z = 0; z < spaceN.dimensions.z; z++)
            for(var x = 0; x < spaceN.dimensions.x; x++)
              do_something(vec3(x,y,z));

Use the **Space.get(vec3)** and **Space.set(vec3, value)** instead of accessing a space matrix directly (unless you know what you are doing).

To convert between YZX and XYZ formats use the **Space.toXYZ()** and **Space.parse.fromXYZ(matrix)**.