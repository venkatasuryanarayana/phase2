var idb = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;
var open = idb.open("Resume builder",1);

open.onupgradeneeded=function(e) {
var request=e.target.result;
request.createObjectStore("form_data",{keyPath:"id",autoIncrement:true})

}
open.onerror=function(e){
console.log("indexedDB error");

}

open.onsuccess=function(e){
  var request=e.target.result;
  // console.log(request);
  var transaction = request.transaction("form_data","readwrite");
  var storeDB = transaction.objectStore("form_data");
  var finalData = storeDB.getAll();
  finalData.onsuccess=function(event) {
    console.log(event.target.result);
    display(event.target.result);
  }
  var parent = document.querySelector(".parent");
  function display(data) {
    data.map((item)=>{
      var child1 = document.createElement("div");
      child1.classList.add("child");

      var profileIcon = document.createElement("img");
      profileIcon.src="boy.svg";
      profileIcon.alt=item.name;
      child1.appendChild(profileIcon);

      var data = document.createElement("p");
      data.textContent = item.name;
      child1.appendChild(data);
      var data1 = document.createElement("p");
      data1.textContent = item.email;
      child1.appendChild(data1);

      var link = document.createElement("a");
      link.href = "resume.html?id="+item.id;
      link.textContent="View Profile";
      child1.appendChild(link);
      parent.appendChild(child1);


    })
  }

}
