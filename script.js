// Write your JavaScript code here!
function init(){
 submitButton = document.getElementById("formSubmit");
//form data
 pilotName = document.querySelector("input[name=pilotName]");
 copilotName = document.querySelector("input[name=copilotName]");
 fuelLevel = document.querySelector("input[name=fuelLevel]");
 cargoMass = document.querySelector("input[name=cargoMass]");
//faulty items
launchStatusCheck = document.getElementById("launchStatusCheck");
launchStatus = document.getElementById("launchStatus");
faultyItems = document.getElementById("faultyItems");
 pilotStatus = document.getElementById("pilotStatus");
 copilotStatus = document.getElementById("copilotStatus");
 fuelStatus = document.getElementById("fuelStatus");
 cargoStatus = document.getElementById("cargoStatus");

 //mission target

 missionTarget = document.getElementById("missionTarget");
let missonData=[];
 fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then((res)=>{
      return res.json();
   })
   .then((data)=>{
      console.log(data);
      missonData = data;
      const random = Math.floor(Math.random() * missonData.length);
      missionTarget.innerHTML = `<h2>Mission Destination</h2>
 <ol>
    <li>Name: ${missonData[random].name}</li>
    <li>Diameter: ${missonData[random].diameter}</li>
    <li>Star: ${missonData[random].star}</li>
    <li>Distance from Earth: ${missonData[random].distance}</li>
    <li>Number of Moons: ${missonData[random].moons}</li>
 </ol>
 <img src="${missonData[random].image}">`

   })
   .catch((err)=>{
      console.error(err)
   });

 

submitButton.addEventListener("click", (event)=>{
   
   if(copilotName.value=="" || pilotName.value=="" || fuelLevel.value=="" || cargoMass.value==""){
      
            alert("All fields are required!");
            // stop the form submission
            event.preventDefault();
   }
   else if(!(isNaN(Number(pilotName.value), Number(copilotName.value)))){
      copilotName.value="";
      pilotName.value="";
      alert("Pilot and copilit name should be string!");
      // stop the form submission
      event.preventDefault();
   }
   else if(isNaN(Number(fuelLevel.value), Number(cargoMass.value))){
      fuelLevel.value="";
      cargoMass.value="";
      alert("FuleLevel and CargoMass should be Number");
      event.preventDefault();
   }
   else{
      event.preventDefault();
      
      faultyItems.style.visibility = 'visible';
      pilotStatus.innerHTML  = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.innerHTML = `Copilot ${copilotName.value} is ready for launch`;
      if(Number(fuelLevel.value)<10000){
         console.log("Fuel Level: " + fuelLevel.value)
         fuelStatus.innerHTML = `There is not enough fuel for the journey`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
      }else{
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         launchStatus.innerHTML = `Shuttle is ready for launchh`;
         launchStatus.style.color = 'green';
      }
      if(Number(cargoMass.value)>10000){
         console.log("CargoMass Level: " + cargoMass.value)
         cargoStatus.innerHTML = `There is too much mass for the shuttle to take off`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
      }else{
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
         launchStatus.innerHTML = `Shuttle is ready for launch`;
         launchStatus.style.color = 'green';
      }
      copilotName.value="";
      pilotName.value="";
      fuelLevel.value="";
      cargoMass.value="";
   }
});

}

window.onload = init;

