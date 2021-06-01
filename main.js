song="";
LeftWristX=0;
RightWristX=0;
LeftWristY=0;
RightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video , ModelLoaded);
    poseNet.on('pose' , GotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill('#FF0000');
    stroke('#FF0000');

    if (scoreLeftWrist > 0.2){
        circle(LeftWristX , LeftWristY , 20);
        inNumberLeftWristY = Number(LeftWristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = " + volume;
        song.setVolume(volume);
    }   

    if (scoreRightWrist > 0.2){
        circle(RightWristX , RightWristY , 20);
         
        if (RightWristY > 0 && RightWristY <= 100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML=" Speed = 0.5x";
        }

        if (RightWristY > 100 && RightWristY <= 200){
            song.rate(1);
            document.getElementById("speed").innerHTML=" Speed = 1x";
        }

        if (RightWristY > 200 && RightWristY <= 300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML=" Speed = 1.5x";
        }

        if (RightWristY > 300 && RightWristY <= 400){
            song.rate(2);
            document.getElementById("speed").innerHTML=" Speed = 2x";
        }

        if (RightWristY > 400 && RightWristY <= 500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML=" Speed = 2.5x";
        }
    }
}

function preload(){
    song=loadSound('music.mp3');
}

function play(){
    song.play();
    song.rate(1);
}

function ModelLoaded(){
    console.log("PoseNet Is Initialized !");
}

function GotPoses(results){
if (results.length > 0){
    console.log(results);
    LeftWristX=results[0].pose.leftWrist.x;
    RightWristX=results[0].pose.rightWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    RightWristY=results[0].pose.rightWrist.y;
    console.log("Left Wrist X = " + LeftWristX);
    console.log("Right Wrist X = " + RightWristX);
    console.log("Left Wrist Y = " + LeftWristY);
    console.log("Right Wrist Y = " + RightWristY);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log(scoreLeftWrist);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
}
}