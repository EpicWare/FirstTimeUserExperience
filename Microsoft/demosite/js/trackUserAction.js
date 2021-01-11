pastActions = [];
console.log(" Got JS");
function toolinate(element, tool) {
    console.log(tool.type);
    pastActions.push(tool.toolName);
    if (tool.type=='overlay' || tool.type=="gif" || tool.type=="video"){

      createoverlay(tool, element);
    }
    else if (tool.type=='tooltip') {
      createTooltip(tool, element);
    }
    else if (tool.type=='q1' || tool.type=='quick1' ||tool.type=='quickoverlay1' ||tool.type=='textBox'){
        quick1(tool);
    }
    else if (tool.type=='q2' || tool.type=='quick2' ||tool.type=='quickoverlay2' ||tool.type=='sideBar'){
        quick2(tool);
    }
    else if (tool.type=='q5' || tool.type=='quick5' ||tool.type=='quickoverlay5' ||tool.type=='video'){
        quick5(tool);
    }
for (i=0; i<tips.length; i++) {
  if (tips[i]==tool) {
    tips.splice(i, 1);
  }
}
  // tips.splice(tool, 1);
}


function quick1(tool) {
  var test = document.getElementById("quickoverlay1");
  // check if there's already one then we dont create another.
  if (test != undefined) {
    console.log("already here")
    console.log(test)
    test.style.display = "block"
    return ;
  }

  var div1=document.createElement("div");
  div1.setAttribute("class","quick1");
  div1.setAttribute("id", 'quickoverlay1');
  div1.innerHTML = tool.content;
  div1.setAttribute('onclick', "off('quickoverlay1')")

  document.body.appendChild(div1);
}

function quick2(arg){
  var test = document.getElementById("quickoverlay2");
  // check if there's already one then we dont create another.
  if (test != undefined) {
    console.log("already here")
    console.log(test)
    test.style.display = "block"
    return ;
  }
  var root=document.createElement("div");
  root.setAttribute("id","quickoverlay2");
  root.setAttribute("class","quickoverlay2");
  root.setAttribute("onclick", "off('quickoverlay2')");
  document.body.appendChild(root);

  for(i=0; i<arg.features.length; i++){
    console.log(arg.features[i])
    if (arg.features[i].type == 'img'){
      img(arg.features[i], root);
    }
    else if (arg.features[i].type == 'text'){
      text(arg.features[i], root);
    }
    else if (arg.features[i].type == 'head'){

    }
  }

}

function quick5(arg){
  var test = document.getElementById("quickoverlay5");
  // check if there's already one then we dont create another.
  if (test != undefined) {
    console.log("already here")
    console.log(test)
    test.style.display = "block"
    return ;
  }
  var root=document.createElement("div");
  root.setAttribute("id","quickoverlay5");
  root.setAttribute("class","quickoverlay5");
  //root.setAttribute("onclick", "off('quickoverlay5')");
  document.body.appendChild(root);

  for(i=0; i<arg.features.length; i++){
    console.log(arg.features[i])
    if (arg.features[i].type == 'video'){
      video(arg.features[i], root);
    }
  }
  var close=document.createElement("button");
  close.setAttribute("class","close");
  close.setAttribute("value","quickoverlay5");
  close.setAttribute("onclick","off(this.value)");
  close.innerHTML = "X";
  root.appendChild(close);
}

function off(id) {
  elem = document.getElementById(id);
  console.log(elem);
  if (elem != undefined){
    document.body.removeChild(elem);
  }
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

xmlhttp.open("GET", "json/tutorials.json", true);
xmlhttp.send();



function createTooltip(arg, elem) {
  // var div1=document.createElement("div");
  // div1.setAttribute("id","tooltip");
  // div1.setAttribute("class","tipoverlay");
  //
  // div1.setAttribute("onmouseout","off(tooltip)");
  // document.body.appendChild(div1);
  // if (typeof arg.content != undefined) {
  //   div1.innerHTML = arg.content;
  // //  console.log("div1 contented")
  // }
  // console.log(arg);
  for(i=0; i<arg.features.length; i++){
//    console.log('constructing')
    construct(arg.features[i], elem);
  }
}







//
// function createTooltip(arg, elem) {
//   elem.setAttribute("class", arg.type);
//   elem.setAttribute("id", arg.toolName);
//   elem.setAttribute('data-tooltip', arg.content);
//   for(i=0; i<arg.features.length; i++){
//     for(type in arg.features[i]){
//       namer = "#"+arg.toolName+":before";
//       document.styleSheets[0].insertRule(namer + " { "+ type+":"+arg.features[i]+" }");
//       document.styleSheets[0].cssRules[0].style.type= arg.features[i];
//     }
//    console.log(elem.style);
//   }
// }

function createoverlay(arg,elem) {
  var div1=document.createElement("div");
  div1.setAttribute("id","overlay");
  div1.setAttribute("class","overlay");
  div1.setAttribute("onclick", "off('overlay')");
  document.body.appendChild(div1);

  if (typeof arg.content != undefined) {
    div1.innerHTML = arg.content;
  //  console.log("div1 contented")
  }
  // console.log(arg);
  for(i=0; i<arg.features.length; i++){
//    console.log('constructing')
    construct(arg.features[i], div1);
  }
  // var close=document.createElement("button");
  // close.setAttribute("class","close");
  // close.setAttribute("value","arg");
  // close.setAttribute("onclick","off(this.value)");
  // close.innerHTML = "X";
  // div1.appendChild(close);
}


function constructTip(arg, root) {
  var video=document.createElement(arg.type);
  for(type in arg){
  video.setAttribute(type,arg[type]);
  }
  root.appendChild(video);
}


function construct(arg, root) {
  console.log(arg.type);
  var video=document.createElement(arg.type);
  for(type in arg){
    video.setAttribute(type,arg[type]);
  }
  root.appendChild(video);
}


function video(arg, root){
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
  for(type in arg){
    text.setAttribute(type,arg[type]);
    if (type == 'innerHTML'){
      text.innerHTML = arg[type];
    }
  }

  root.appendChild(text);
}

function link(arg,root){
  var button=document.createElement("button");
  for(type in arg){
    if(type == "texts"){
      button.innerHTML = arg[type];
    }
    else{
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
    }
    else{
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
          // console.log(i);
          toolinate(t4rg3ts[i], tool);
        }
        // delete tips[i];

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
//
function trash () {
  console.log('trashed');
  var all = document.getElementsByTagName("*");
  for (var i=0, max=all.length; i < max; i++) {
     if (all[i].hasAttribute("data-tooltip")) {
       all[i].classList.remove("tooltip");
       all[i].removeAttribute("data-tooltip");
     }
   }

}
// setTimeout(trash, 10000);
