let ball_y,ball_x,ball_dx,ball_dy,ball_dia
let paddle_x,paddle_y,paddle_height,paddle_width,paddle_dx;
let bric=[];
let live;
let score;
let bric_hit;
function setup() {
  createCanvas(400, 400);
  
  //Dimension of ball
  ball_y= height/2; 
  ball_x=width/2;
  ball_dx=3;
  ball_dy=1;
  ball_dia=24;
  
  //Dimension of paddle
  paddle_x=(width/2)-(80/2);
  paddle_y=height-20;
  paddle_height=20;
  paddle_width=100;
  paddle_dx=3;
  
  //Intial ball and score value
  score=0;
  bric_hit=0;
  live=3;
  
  //Bric pattern
  var dx = 80;
  var dy = 60;
  for(var row=0; row<4; row++){
    let bric_row = [];
    for(var col=0; col<5; col++){

      let bric = {};
      bric["x"] = 15+ dx*col;
      bric["y"] = 45 + dy*row;
      bric["w"] = 60;
      bric["h"] = 20;
      bric["status"] = 1;
      
      bric_row.push(bric);
    }
    bric.push(bric_row);
  }
}
function draw(){
  background("white");
  ball_y +=ball_dy;
  ball_x +=ball_dx;
  if(keyIsDown(RIGHT_ARROW)&&(paddle_x+paddle_width)<width){
    paddle_x +=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW)&&(paddle_x>0)){
    paddle_x -=paddle_dx;
  }
  text("Score:"+score,width-100,20);
  text("Life:"+live,width-100,35);
   
   fill("red");
  circle(ball_x,ball_y,ball_dia);
   fill("black");
  rect(paddle_x,paddle_y, paddle_width,paddle_height);
  
  //Ball bouncing back from paddle and wall properties
  // right side and left side
  if(((ball_x+(ball_dia/2)>width))|| ((ball_x-ball_dia/2<0))) {
   ball_dx=-(ball_dx)
  }
  //top
  if((ball_y-ball_dia/2<0)){
    ball_dy=-(ball_dy)
  }
  //bottom bouncing
  if((ball_y+ball_dia/2)>paddle_y){
    if((ball_x>paddle_x)&&(ball_x<=paddle_x+paddle_width)&&((ball_y+ball_dia/2)>paddle_y)) {
      ball_dy= -(ball_dy)
       }
  }
  //bottom over
  if((ball_y+ball_dia/2)>height){
    ball_dx=0;
    ball_dy=0;
 }
  
//bric properties
  
  //bric top
  for(var i=0; i<bric.length; i++){
    for(var j=0; j<bric[1].length; j++){
      if(bric[i][j].status==1){
        rect(bric[i][j].x, bric[i][j].y, bric[i][j].w, bric[i][j].h);

        //bric side
        if(ball_x>=bric[i][j].x && ball_x<=bric[i][j].x+bric[i][j].w && ball_y+ball_dia/2==bric[i][j].y){
          ball_dy = -(ball_dy);
          score+=1;
          bric[i][j].status = 0;
        }
        //bric_bottom
        if(ball_x>=bric[i][j].x && ball_x<=bric[i][j].x+bric[i][j].w && ball_y-ball_dia/2==bric[i][j].y+bric[i][j].h){
          ball_dy = -(ball_dy);
          score+=1;
          bric[i][j].status = 0;
        }
        //bric left
        if(ball_y>=bric[i][j].y && ball_y<=bric[i][j].y+bric[i][j].h && ball_x+ball_dia/2>=bric[i][j].x && ball_x+ball_dia/2<bric[i][j].x + bric[i][j].w){
          ball_dx = -(ball_dx);
          score+=1;
          bric[i][j].status = 0;
        }
        //bric right
        if(ball_y>=bric[i][j].y && ball_y<=bric[i][j].y+bric[i][j].h && ball_x-ball_dia/2<=bric[i][j].x+bric[i][j].w && ball_x-ball_dia/2>bric[i][j].x){
          ball_dx = -(ball_dx);
          score+=1;    
          bric[i][j].status = 0;
        }
      }
    }
  }
  if(ball_dx==0 && ball_dy==0 && live!=0){
    live = live-1;
    ball_x = width/2;
    ball_y = height - 50;
    ball_dx = 3; //change in distance i.e speed
    ball_dy = -1;
    paddle_x = width/2 - (paddle_width/2);
    paddle_y = height-15;

  }
  if(score== 25 && live!==0){
    text("You Win", 170, 200);
    text("Game Over", 170, 230);
    ball_dx = 0;
    ball_dy = 0;
  }
    
  if(live == 0){
    text("Game Over", 170, 200);

    ball_dx = 0;
    ball_dy = 0;
  }
}
