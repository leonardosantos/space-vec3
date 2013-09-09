module.exports = s;

var vec3 = require("vec3");
s.vec3 = vec3;
s.Space = Space;

function s(arg1, arg2){
    if(Array.isArray(arg1))
        return Space.parse(arg1);
    else if (typeof(arg1) == "object" && typeof(arg1.x) != "undefined" &&
             typeof(arg1.y) != "undefined"  && typeof(arg1.z) != "undefined")
        return new Space(arg1, arg2);
    else
        throw new Error("First argument must be either a 3d Array matrix or a vec3.");
}

function if_undefined(current_value, default_value){
    if (typeof(current_value) == "undefined")
        return default_value;
    else
        return current_value;
}

function Space(dimensions, content){
    this.dimensions = null;
    this.matrix = null; // Conventionally (y,z,x)

    content = if_undefined(content, 0);
    dimensions = if_undefined(dimensions, vec3(1,1,1));
    if (dimensions.x < 1 || dimensions.y < 1 || dimensions.z < 1)
        return;
    this.dimensions = dimensions;
    this.matrix = new Array(this.dimensions.y);
    for(var y = 0; y < this.dimensions.y; y++){
        this.matrix[y] = new Array(this.dimensions.z);
        for(var z = 0; z < this.dimensions.z; z++){
            this.matrix[y][z] = new Array(this.dimensions.x);
            for(var x = 0; x < this.dimensions.x; x++)
                this.matrix[y][z][x] = content;
        }
    }

}

Space.prototype.get = function(position){
    return this.matrix[position.y][position.z][position.x];
};

Space.prototype.set = function(position, value){
    this.matrix[position.y][position.z][position.x] = value;
};


Space.dimensionsOf = function (matrix) {
    var dimensions = vec3(matrix[0][0].length, matrix.length, matrix[0].length);
    for(var y = 0; y < matrix.length; y++){
        if(matrix[y].length != dimensions.z)
            throw new Error("Invalid matrix");
        for(var z = 0; z < matrix[y].length; z++)
            if(matrix[y][z].length != dimensions.x)
                throw new Error("Invalid matrix");
    }
    return dimensions;
};

Space.prototype.toXYZ = function(){
    var result = new Array(this.dimensions.x);
    for(var x = 0; x < this.dimensions.x; x++){
        result[x] = new Array(this.dimensions.y);
        for(var y = 0; y < this.dimensions.y; y++){
            result[x][y] = new Array(this.dimensions.z);
            for(var z = 0; z < this.dimensions.z; z++)
                result[x][y][z] = this.matrix[y][z][x];
        }
    }
    return result;
};

Space.parse = function(matrix){
    var space = new Space();
    space.dimensions = this.dimensionsOf(matrix);
    space.matrix = matrix;

    return space;
};

Space.parse.fromXYZ = function(matrix){
    var dimensions = Space.dimensionsOf(matrix);
    dimensions = vec3(dimensions.y, dimensions.z, dimensions.x);
    var result = new Array(dimensions.y);
    for(var y = 0; y < dimensions.y; y++){
        result[y] = new Array(dimensions.z);
        for(var z = 0; z < dimensions.z; z++){
            result[y][z] = new Array(dimensions.x);
            for(var x = 0; x < dimensions.x; x++)
                result[y][z][x] = matrix[x][y][z];
        }
    }
    return Space.parse(result);
};

Space.identity = function(size, element0, element1){
    element0 = if_undefined(element0, 0);
    element1 = if_undefined(element1, 1);

    var space = new Space(vec3(size, size, size), element0);
    for(var i = 0; i < size; i++)
        space.matrix[i][i][i] = element1;
    return space;
};
