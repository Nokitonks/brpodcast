function openAbout(){
  const page = document.getElementById('about_page')
  page.style.transform = "rotate3d(0, 0, 0, 0deg)"
  page.style.width = "100vw"
  page.style.height = "100vh" 
  page.style.left = "0"
  page.style.bottom = "0"
  setTimeout(function(){
    window.location.href = "about_page"
  }, 1000)
 }

function openNav(){
  const panel = document.getElementById('nav_panel')
  if (panel.style.width == "40vw"){
    panel.style.width = "0"
  }
  else{
    panel.style.width = "40vw"
  }
}

  function navScroll(e_id,index){
  
    console.log(e_id,index)
    const nl_element = document.getElementById("nav_list");
    var trans = window.getComputedStyle(nl_element).transform
    var parse_trans = trans.split(",")
    var float_trans = parseFloat(parse_trans[5]);

    //Now we have the current transform_Y of the overall div
    //So we need to figure out what y transform is apporopriate for
    //the clicked on item
    const li_container = document.getElementById(e_id)

    //Ignore if already contained
    if (li_container.classList.contains("focused")) return;
    var li_height = window.getComputedStyle(li_container).height
    var shift = (parseFloat(li_height) * index)
    var shift_bg = (parseFloat(li_height) * index*15)
    document.getElementById("sineCanvas").style.transform = "translateY(-"+shift_bg+"px)" 
    document.getElementById("sineCanvas2").style.transform = "translateY(-"+shift_bg+"px)" 
    nl_element.style.transform = "translateY(-"+shift+"px)" 


    const all_containers = document.querySelectorAll('.li_container');
    all_containers.forEach((element) => {
      element.classList.remove('focused');
      for (const child of element.children){
        if (child.classList.contains("li_desc")){

          //Reset all childs to 0 opacity
          child.style.opacity = "0%" 
        }
      }
    });
    if (index == 1) {li_container.classList.add("focused")}
    for (const child of li_container.children){
      if (child.classList.contains("li_desc")){

        //Bring it on screen
        child.style.opacity = "100%" 
      }
    }
    li_container.classList.add("focused") 

  }
