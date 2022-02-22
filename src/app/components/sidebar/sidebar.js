import React from 'react'
import './sidebar.css'
function sidebar(){

   function openNav(){
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "0";
   }

   function closeNav(){
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}


    return(
       <div>
       
<div id="mySidebar" class="sidebar">
  <a href="javascript:void(0)" className="closebtn" onClick={closeNav}><p>×</p></a>
  <a href="#">My Account</a>
  <a href="#">Sign In</a>
  <a href="#">Help</a>
</div>

<div id="main">
  <button className="openbtn" onClick={openNav}>☰</button>  

</div>

</div>

    )
}


export default sidebar