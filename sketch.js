var ball, position, database;
var locofnode;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //linking database to the code
    database = firebase.database();
    //refering the location of the ball
    locofnode = database.ref("ball/position");
    //on = listener
    locofnode.on("value", readOp, showerr);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        WritePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        WritePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        WritePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        WritePosition(0,+1);
    }
    drawSprites();
}

function WritePosition(x,y){
    // updating the position of the ball
    database.ref("ball/position").set({
    x:ball.x + x,
    y:ball.y + y
    });
}

function readOp(data) {
// storing data at the position
position = data.val();
ball.x = position.x;
ball.y = position.y;
}

function showerr() {
console.log("error");
}