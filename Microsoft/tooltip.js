var Tooltip = {
    init: function(){
      var theLinks = document.getElementsByTagName("a");
      if(theLinks){
          for (var i=0;i<theLinks.length;i++){
            if(theLinks[i].title.length){
              theLinks[i].addEventListener("mouseover",Tooltip.showTip);
              theLinks[i].addEventListener("mouseout",Tooltip.hideTip);
            }
          }
      }

    },

    showTip : function(event){
      // create and all span element to act as a Tooltip
      var spanElm = document.createElement("span");
      spanElm.className="tooltip";
      spanElm.innerHTML="here is our first tool tip";

      event.target.title=""; // for existing default Tooltip
      event.target.apppendChild(spanElm);
      event.target._spanRef=spanElm;

    },

    hideTip : function(event){

      event.target.title=event.target._spanRef.innerHTML;
      event.target.removeChild(event.target._spanRef);

    }
};

window.addEventListener("load",Tooltip.init);
