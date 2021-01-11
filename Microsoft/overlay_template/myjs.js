
// this function is used to create ainput rguments.
// if we have arguments provided by eliyah (from json file), we can remove this function.
// the data structure of input argument would be the follwoing.
function tests(){
  var img_obj={
    class : "img",
    id  : "img",
    src : "http://i.imgur.com/HEAD5PU.gif",
  };
  var video_obj={
    class : "video",
    id  : "video",
    src : "shi.mp4",
    width : "70%",
    controls : "controls"
  };
  var link_obj={
    class : "link",
    id  : "link",
    texts : "more imformation",
    onclick : "play_video()"
  };
  var lists ={
    link : link_obj,
    img : img_obj,
    video : video_obj,
  };
  var body=document.getElementById("b");
  createoverlay(lists,body);
}


// this is main function to create overlay.
// first create a overlay class,
// write a for loop to create nodes based on what argument they pass in.
// then append every other nodes onto this overlay class.

function createoverlay(arg,body) {
    var div1=document.createElement("div");
    div1.setAttribute("id","overlay");
    div1.setAttribute("class","overlay");
    body.appendChild(div1);
    for(key in arg){
      if(key=="video"){
        video(arg[key],div1);
      }
      if(key=="img"){
        img(arg[key],div1);
      }
      if(key=="text"){
        text(arg[key],div1);
      }
      if(key=="link"){
        link(arg[key],div1);
      }
    }
    var close=document.createElement("button");
    close.setAttribute("class","close");
    close.setAttribute("value","arg");
    close.setAttribute("onclick","off(this.value)");
    close.innerHTML = "X";
    div1.appendChild(close);
}




function video(arg,root){
  var video=document.createElement("video");
  for(key in arg){
  video.setAttribute(key,arg[key]);
  }
  root.appendChild(video);
}


function img(arg,root){
  var img=document.createElement("img");
  for(key in arg){
  img.setAttribute(key,arg[key]);
  }
  root.appendChild(img);
}

function text(arg,root){
  var text=document.createElement("p");
  text.setAttribute("id","text");
  for(key in arg){
  text.setAttribute(key,arg[key]);
  }
  root.appendChild(text);
}

function link(arg,root){
  var button=document.createElement("button");
  for(key in arg){
  if(key == "texts"){
    button.innerHTML = arg[key];
  }else{
  button.setAttribute(key,arg[key]);
  }
}
  root.appendChild(button);
}

// delete overlay so we can delete everying appended to this class.

function off() {
    var overlay = document.getElementById("overlay");
    overlay.parentNode.removeChild(overlay);
    var close = document.getElementById("close");
    close.parentNode.removeChild(close);
}

function play_video() {
    document.getElementById("img").style.display = "none";
    document.getElementById("video").style.display = "block";
}
