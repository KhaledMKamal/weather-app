/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);

// Async POST to server
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

 /* Weather map WEB API WITH FETCH --  */
 // Global Variables
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=a6f2fa12c347834e63852c0f2f1f8d77';

// event lisenter for waiting clicking on generate
 document.getElementById('generate').addEventListener('click', performAction);

 //function to get Temperature test zip = 56585,57544
 const getTemperature= async (basicURL, zip, key)=>{
  // fetch API
    const res = await fetch(basicURL+zip+key)
    try {
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      // appropriately handle the error
      console.log("error", error);
    }
  }

// function to get all data from server and updatig UI
const updateUI = async () => {
  const request = await fetch('/getAll');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date : ${allData.date}`;
    document.getElementById('temp').innerHTML = `${allData.temp} °K`;
    document.getElementById('content').innerHTML = allData.feelings;
    console.log(allData.feelings);

  } catch(error){
    console.log("error", error);
  }
}

// function for getting temperature then posting it and User's feelings and date to the server and retreiving it to then updating UI
 function performAction(e){  
  
  let zipCode =  document.getElementById('zip').value;
  let feelings =  document.getElementById('feelings').value;
  if (zipCode.length === 0) {
    alert('Please enter zip code');
  } else {
   getTemperature(baseURL,zipCode, apiKey)
   .then(data=>{
    // Add data
    console.log(data);
    postData('/postAll', {temp:data.main.temp, feelings, date:newDate} )
    
   })
   .then(updateUI)
    }
  }