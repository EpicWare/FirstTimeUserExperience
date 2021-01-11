pastActions = [];
console.log(" Got JS");
function toolinate(element, tool) {
console.log(tool);
      pastActions.push(tool.toolName);
      if (tool.type=='overlay' || tool.type=="gif" || tool.type=="video"){
          createoverlay(tool, element);
      }
      else if (tool.type=='tooltip') {

        console.log(element, tool.features, "XXXXX");
        element.setAttribute("class", tool.type);
        element.setAttribute('data-tooltip', tool.content);
      }
      else if (tool.type=='q1' || tool.type=='quick1' ||tool.type=='quickoverlay1' ||tool.type=='textBox')
        {
          quick1()
        }

     else {
      // element.setAttribute("class", tool.type);
    }


}

function off() {
  elem = document.getElementById("overlay");
  console.log(elem);
  document.body.removeChild(elem);
}


var tips = [];
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        var len=myArr.length;
        for (i = 0; i < len; i++) {
          tips.push(myArr.pop());
        }
    }
};
xmlhttp.open("GET", "../json/tutorials.json", true);
xmlhttp.send();



function createoverlay(arg,elem) {
    var div1=document.createElement("div");
    div1.setAttribute("id","overlay");
    div1.setAttribute("class","overlay");
    document.body.appendChild(div1);


if (typeof arg.content != undefined) {
  div1.innerHTML = arg.content;
  console.log("div1 contented")
}
    // console.log(arg);
    for(i=0; i<arg.features.length; i++){
      console.log('constructing')
      construct(arg.features[i], div1);
    }
    var close=document.createElement("button");
    close.setAttribute("class","close");
    close.setAttribute("value","arg");
    close.setAttribute("onclick","off(this.value)");
    close.innerHTML = "X";
    div1.appendChild(close);
}

function construct(arg, root) {
  console.log(arg.type);
  var video=document.createElement(arg.type);
  for(type in arg){
  video.setAttribute(type,arg[type]);
  }
  root.appendChild(video);
}


function video(arg,root){
  var video=document.createElement("video");
  for(type in arg){
  video.setAttribute(type,arg[type]);
  }
  root.appendChild(video);
}


function img(arg,root){
  var img=document.createElement("img");
  for(type in arg){
  img.setAttribute(type,arg[type]);
  }
  root.appendChild(img);
}

function text(arg,root){
  var text=document.createElement("p");
  text.setAttribute("id","text");
  for(type in arg){
  text.setAttribute(type,arg[type]);
  }
  root.appendChild(text);
}

function link(arg,root){
  var button=document.createElement("button");
  for(type in arg){
  if(type == "texts"){
    button.innerHTML = arg[type];
  }else{
  button.setAttribute(type,arg[type]);
  }
}
  root.appendChild(button);
}

var eventTargets=[];
var eventtypes=[];
var targetStrings=[];
var evnts=["click","focus","blur","typeup","typedown","typepressed","mouseover"];
// You can also Use mouseup/down, mousemove, resize and scroll
for(var i=0;i<evnts.length;i++){
console.log("Inside action listener");
window.addEventListener(""+evnts[i]+"", function(e){ myFunction(e); }, false);

}

function myFunction(e){
var evt=e||window.event;
if(evt){
if(evt.isPropagationStopped&&evt.isPropagationStopped()){
    return;
}
var et=evt.type?evt.type:evt;
var target=evt.target?evt.target:window;
var trgt=evt.target?evt.target:window;


if(trgt.className&&trgt.id){
trgt="."+trgt.className+"#"+trgt.id;
}
else if(trgt.id){
trgt="#"+trgt.id;
}
else if(trgt.className){
trgt="."+trgt.className;
}

if(typeof(trgt)!="String"){
// Neither Class nor Id is defined
if(trgt.tagName){
// If it is html tag display its tag name
 trgt=trgt.tagName;
}else{
// No class + No Id + Not a Html tag
    trgt=trgt.toString();
    trgt=trgt.replace("[object ","");
    trgt=trgt.replace("]","");
        trgt=trgt.replace("htmlbodyelement","BODY");

}
}

eventTargets.push(evt.target);
targetStrings.push(trgt);
eventtypes.push(et);

makeTools(eventTargets, eventtypes, targetStrings, tips);
}
}


function makeTools (eventTarget, eventtypes, targetStrings, data) {
  // console.log("makercalled");
  var lastTarget = eventTarget[eventTargets.length-1];
  var last = eventtypes[eventTargets.length-1];


for (i = 0; i<data.length; i++) {
  var tool = data[i];

  var endChain = tool.chains[tool.chains.length-1];

  var element = endChain.element;
  var action = endChain.action;

  if (lastTarget.id == element || lastTarget.className == element || lastTarget.tagName == element) {
    var chk = -1;
    var ink = tool.chains.length;
    var success = false;
    index= -1;

    for(ii=0; ii<ink; ii++) {
        chk = chainCheck(tool.chains[ii], targetStrings, eventtypes,index);
        console.log(chk, ii );
        if (chk != -1) {
          index = chk;
        }
        else {
          index = eventtypes.length;
        }
      }
      if (chk != -1) {
        success = true;
      }
      if(success==true){


      t4rg3t = tool.target;
      t4rg3ts = [];
      if (t4rg3t=="last") {
        t4rg3ts.push(lastTarget);
      }
      else {
        for (i=0; i<targetStrings.length; i++) {
          tst = targetStrings[i].substring(1);
          if (tst==t4rg3t) {
            t4rg3ts.push(eventTargets[i]);
          }
        }
        if (t4rg3ts.length<=0) {
          t4rg3ts.push(lastTarget);
        }
      }
      for (i=0; i<t4rg3ts.length; i++) {
        toolinate(t4rg3ts[i], tool);
      }
      tips.splice(i, 1);
      }
  }

}
}

function chainCheck(tool, eventTarget, eventtypes, index) {


  userAc=tool.action;
  elem = tool.element;
if (userAc!='toolEvent') {
  for (i=index+1; i < eventTarget.length; i++) {
    // console.log(userAc);
    tstString = eventTarget[i].substring(1);
    if (tstString==elem && eventtypes[i]==userAc) {
      return i;
    }

  }
return -1;
}
else if (userAc=='toolEvent'){
      needed = tool.eventCount;
      count = 0;
      for (i=0; i>pastActions.length; i++) {
        if (pastActions[i] = elem) {
          count ++;
        }
      }
      if (count == needed) {
        return 3;
      }
      else {
        return -1;
      }
}
}

function trash (time) {
  console.log('trashed');
  var all = document.getElementsByTagName("*");
for (var i=0, max=all.length; i < max; i++) {
     if (all[i].hasAttribute("data-tooltip")) {
       all[i].classList.remove("tooltip");
       all[i].removeAttribute("data-tooltip");
     }
}
setTimeout(trash, time);
}
// trash(10000);
