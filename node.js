const express = require('express');
// Imports the CORS (Cross-Origin Resource Sharing) middleware module
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
//An Express.js middleware setup that enables CORS for the Express application
app.use(cors());


// define a route using a callback function that will be invoked
// when the user makes a HTTP request to the root of the folder (URL)
// display some information about the REST Service
app.get('/', function (req, res) {
  res.status(200);
  res.send("<h4>Fitness calculator can help you to estimate BMI, total body fat, ideal weight, and amount of daily calories burned with low activity. \nTo do so, fill out the form and click 'Calculate'. </H4>");
  console.log("a request has been processed in / (root) ");
});


// Calculate BMI
app.post('/bmi', (req, res) => {
  const { height, weight } = req.body;
  if (!height || !weight) {
    return res.status(400).json({ error: 'Height and weight are required' });
  }
  
  console.log("Server (/bmi) got the request with parameters:" + JSON.stringify(req.body));
  const bmi = calculateBMI(height, weight);

  //convert response in JSON format
  res.json({ bmi });
});

// Calculate body fat
app.post('/bodyfat', (req, res) => {
  const { age, gender, bmi } = req.body;
  if (!age || !gender || !bmi) {
    return res.status(400).json({ error: 'Age, gender, and bmi are required for body fat calculation' });
  }

  console.log("Server (/bodyfat) got the request with parameters:" + JSON.stringify(req.body));
  const bodyFat = calculateBodyFat(age, gender, bmi);
  res.json({ bodyFat });
});

// Calculate ideal weight
app.post('/idealweight', (req, res) => {
  const { height, gender } = req.body;
  if (!height || !gender) {
    return res.status(400).json({ error: 'Height and gender are required' });
  }

  console.log("Server (/idealweight) got the request with parameters:" + JSON.stringify(req.body));
  const idealWeight = calculateIdealWeight(height, gender);
  res.json({ idealWeight });
});

// Calculate calories burned
app.post('/caloriesburned', (req, res) => {
  const { age, gender, weight, height} = req.body;
  if (!age || !gender || !weight || !height) {
    return res.status(400).json({ error: 'Age, gender, weight, and height are required' });
  }

  console.log("Server (/caloriesburned) got the request with parameters:" + JSON.stringify(req.body));
  const caloriesBurned = calculateCaloriesBurned(age, gender, weight, height);
  res.json({ caloriesBurned });
});



//*********           calculations are below           ************ */

//The formula is BMI = kg/(m*m)
function calculateBMI(height, weight) {
  const bmi = weight / (height * height);
  return bmi.toFixed(2); //round to two decimal places
}

// body fat result in % using DEURENBERG FORMULA
function calculateBodyFat(age, gender, bmi) {
  if ( gender === "male") {
    var bodyFat = (1.20 * bmi) + (0.23 * age) - 10.8  - 5.4;
  } else {
    var bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
  }

  return bodyFat.toFixed(2);
}

//Ideal weight in kg, height in meters
function calculateIdealWeight(height, gender) {
  if (gender === "male") {
    var idealWeight = 22*(2*height);
  } else {
    var idealWeight = 22*(2*(height-0.1));
  }
  
  return idealWeight.toFixed(2);
}

/**
 * estimation for no activity (lazy and passive person).
 * For men: 66 + (6.2 x weight) + (12.7 x height) – (6.76 x age)
 * For women: 655.1 + (4.35 x weight) + (4.7 x height) – (4.7 x age)
*/
function calculateCaloriesBurned(age, gender, weight, height) {
if (gender == "male"){
  var caloriesBurned = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
} else { 
  var caloriesBurned = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
}
  return caloriesBurned.toFixed(2);
}



// Default route to handle invalid URLs
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});