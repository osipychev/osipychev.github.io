/* 
/ FARM ENVIRONMENT
/
*/

//GLOBALS
var actions = {idle:1, kill:2, left:3, right:4};
var n_agents = 5;
var state = new Array(5);


//--------------------------------------------------------
// A Simple 2D Grid Class
var UGrid2D = function (min_corner, max_corner, resolution) {
    this.min_corner = min_corner;
    this.max_corner = max_corner;
    this.resolution = resolution;
    console.log('Environment instance created');
}

// Method: draw_grid
// Draw the grid lines

UGrid2D.prototype.draw_grid = function (canvas) {
    var ctx = canvas.getContext('2d');
    loc = [0, 0];
    delta = canvas.width / this.resolution;
    for (var i = 0; i <= this.resolution; i++) {
        ctx.beginPath();
        ctx.moveTo(i * delta, 0);
        ctx.lineTo(i * delta, canvas.height - 1);
        ctx.lineWidth = .1;
        // set line color
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
    loc = [0, 0];

    delta = canvas.height / this.resolution;

    for (var i = 0; i <= this.resolution; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * delta);
        ctx.lineTo(canvas.width - 1, i * delta);
        ctx.lineWidth = .1;
        // set line color
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
}

// Method: show_values
// Show values on the grid corresponding it its corner
/*
UGrid2D.prototype.print_string = function (canvas, state, string, dim) {
    var ctx = canvas.getContext('2d');
    // set fonts
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    deltaX = canvas.width / this.resolution;
    deltaY = canvas.height / this.resolution;

    var x = deltaX * state[0] + deltaX/2;
    var y = deltaY * state[1] + deltaY/2;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(string, x, y);
}
*/

UGrid2D.prototype.print_message = function (canvas, string) {
    var ctx = canvas.getContext('2d');
    // set fonts
    ctx.font = "32px Arial";
    x = canvas.width / 2;
    y = 0;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "red";
    ctx.fillText(string, x, y);
    ctx.strokeStyle = "black";
    ctx.strokeText(string, x, y);
}

//// Method: show_values
//// Show values on the grid corresponding it its corner
//
//UGrid2D.prototype.show_values = function (canvas, matrix, dim) {
//    var ctx = canvas.getContext('2d');
//    // set fonts
//    ctx.font = "10px Arial";
//    ctx.fillStyle = "black";
//    deltaX = canvas.width / this.resolution;
//    deltaY = canvas.height / this.resolution;
//
//    // loop over all corners
//    for (var i = 0; i < this.resolution; i++) {
//        for (var j = 0; j < this.resolution; j++) {
//
//            var x = deltaX * i + deltaX/2;
//            var y = deltaY * j + deltaY/2;
//            ctx.textAlign = "center";
//            ctx.textBaseline = "middle";
//            
//            var val = matrix[i][j];
//            val = Math.round(val * 100) / 100;
//            ctx.fillText(val, x, y);
//        }
//    }
//}

//UGrid2D.prototype.show_qvalues = function (canvas, matrix, dim, dim3) {
//    var ctx = canvas.getContext('2d');
//    // set fonts
//    ctx.font = "8px Arial";
//    ctx.fillStyle = "black";
//    deltaX = canvas.width / this.resolution;
//    deltaY = canvas.height / this.resolution;
//
//    // loop over all corners
//    for (var i = 0; i < this.resolution; i++) {
//        for (var j = 0; j < this.resolution; j++) {
//
//            var x = deltaX * i + deltaX/2;
//            var y = deltaY * j;
//            ctx.textAlign = "center";
//            ctx.textBaseline = "top";
//            var val = matrix[i][j][2];
//            val = Math.round(val * 100) / 100;
//            ctx.fillText(val, x, y);
//            
//            var x = deltaX * i + deltaX/2;
//            var y = deltaY * j + deltaY;
//            ctx.textAlign = "center";
//            ctx.textBaseline = "bottom";
//            var val = matrix[i][j][3];
//            val = Math.round(val * 100) / 100;
//            ctx.fillText(val, x, y);
//        
//            var x = deltaX * i;
//            var y = deltaY * j + deltaY/2;
//            ctx.textAlign = "left";
//            ctx.textBaseline = "middle";
//            var val = matrix[i][j][0];
//            val = Math.round(val * 100) / 100;
//            ctx.fillText(val, x, y);
//        
//            var x = deltaX * i + deltaX;
//            var y = deltaY * j + deltaY/2;
//            ctx.textAlign = "right";
//            ctx.textBaseline = "middle";
//            var val = matrix[i][j][1];
//            val = Math.round(val * 100) / 100;
//            ctx.fillText(val, x, y);
//            
////            var x = deltaX * i + deltaX/2;
////            var y = deltaY * j + deltaY/2;
////            ctx.textAlign = "center";
////            ctx.textBaseline = "top";
////            var val = matrix[i][j][0];
////            val = Math.round(val * 100) / 100;
////            ctx.fillText(val, x, y);
//            
//        }
//    }
//}
//
//UGrid2D.prototype.show_symbols = function (canvas, matrix, dim) {
//    var ctx = canvas.getContext('2d');
//    // set fonts
//    ctx.font = "20px Arial";
//    ctx.fillStyle = "black";
//    deltaX = canvas.width / this.resolution;
//    deltaY = canvas.height / this.resolution;
//
//    // loop over all corners
//    for (var i = 0; i < this.resolution; i++) {
//        for (var j = 0; j < this.resolution; j++) {
//
//            var x = deltaX * i + deltaX/2;
//            var y = deltaY * j + deltaY/2;
//            ctx.textAlign = "center";
//            ctx.textBaseline = "bottom";
//            ctx.fillText(matrix[i][j], x, y);
//        }
//    }
//}

UGrid2D.prototype.show_policy = function (canvas, matrix, dim) {
    var ctx = canvas.getContext('2d');
    // set fonts
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    deltaX = canvas.width / this.resolution;
    deltaY = canvas.height / this.resolution;

    // loop over all corners
    for (var i = 0; i < this.resolution; i++) {
        for (var j = 0; j < this.resolution; j++) {

            var x = deltaX * i + deltaX/2;
            var y = deltaY * j + deltaY/2;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            var val = matrix[i][j];
            
            var act = findMaxInd(val);
            if (val[act] == 0.0) ctx.fillText("o", x, y);
            else if (act == 0) ctx.fillText("←", x, y);
            else if (act == 1) ctx.fillText("→", x, y);
            else if (act == 2) ctx.fillText("↑", x, y);
            else if (act == 3) ctx.fillText("↓", x, y);
            else ctx.fillText("o", x, y);
            
            
            
        }
    }
}

UGrid2D.prototype.show_state = function (canvas,list,dim){
    var ctx = canvas.getContext('2d');
    deltaX = canvas.width / dim;
    deltaY = canvas.height / dim;
    for (var i = 0; i < list.length; ++i){
        ctx.fillStyle="#FF0000";
        var state = list[i].getState();
        ctx.fillRect(state[0]*deltaX,state[1]*deltaY,deltaX,deltaY);
    }
}

UGrid2D.prototype.show_colors = function (canvas, matrix, dim) {
    var ctx = canvas.getContext('2d');
    deltaX = canvas.width / this.resolution;
    deltaY = canvas.height / this.resolution;

    // loop over all corners
    for (var i = 0; i < this.resolution; i++) {
        for (var j = 0; j < this.resolution; j++) {

            var x = deltaX * i + deltaX/2;
            var y = deltaY * j + deltaY/2;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            var val = matrix[i][j];
            var color;
            if (val > 0) color = 'rgb('+(255-val)+',255,'+(255-val)+')';
            else color = 'rgb('+(255+val)+','+(255+val)+',255)';
            
            ctx.fillStyle=color;
            ctx.fillRect(i*deltaX,j*deltaY,deltaX,deltaY);
        }
    }
}

//End UGrid2D--------------------------------------------