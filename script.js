const form = document.getElementById('calculatorForm');
    const resultsDiv = document.getElementById('results');

    // Function to handle the asynchronous fetch
    async function fetchDataFromRoot() {
        try {
            const urlRoot = 'http://127.0.0.1:3000/';
            const response = await fetch(urlRoot, {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.text();
            console.log(responseData);

            // Update the HTML element for results
            $("#rootBlock").html(responseData);

        } catch (error) {
            console.error('Error:', error);
            alert('Error fetching data. Root page could not be loaded.');
        }

        $("#results").fadeIn();
    }
        

    $(document).ready(function() {
        
        //when page is loaded get the responce from root
        fetchDataFromRoot();

        // Event listener for the form submit
        $("#calculatorForm").submit(async function(event) {
        // Prevent the default form submission
        event.preventDefault();
        $("#rootBlock").html("");
        $("#results").fadeOut();

      // Check if the text fields are not empty
      const height = $("#height").val();
      const weight = $("#weight").val();
      const age = $("#age").val();
      const gender = $("#gender").val();

      if (isNaN(height) || isNaN(weight) || isNaN(age) || gender.trim() === '') {
        // At least one of the fields is empty, show an error or perform any other action
        alert("Please fill out all the required fields.");
        return;
        } else {
            // All fields have values, proceed with form submission
            try {
            const userData = {
            height: parseFloat(height),
            weight: parseFloat(weight),
            age: parseInt(age),
            gender
            };

            const urlBmi = 'http://127.0.0.1:3000/bmi';
            const response = await fetch(urlBmi, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                //specify body request
                body: JSON.stringify({
                height: userData.height,
                weight: userData.weight
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData);
            // Process the responseData and update the HTML elements
            setTimeout(() => {
                $("#bmi").html("Your BMI is " + responseData.bmi);
            }, 500);
            // $("#bmi").html("Your BMI is " + responseData.bmi);

            // Body Fat Calculation
            const urlBodyFat = 'http://127.0.0.1:3000/bodyfat';
            const bodyFatResponse = await fetch(urlBodyFat, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                age: userData.age,
                gender: userData.gender,
                bmi: responseData.bmi
                })
            });

            if (!bodyFatResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const bodyFatData = await bodyFatResponse.json();
            console.log(bodyFatData);

            // Update the HTML element for body fat
            setTimeout(() => {
                $("#bodyFat").html("Your body fat is " + bodyFatData.bodyFat + " %");
            }, 500);
            // $("#bodyFat").html("Your body fat is " + bodyFatData.bodyFat + " %");

            // Ideal weight Calculation
            const urlIdealWeight = 'http://127.0.0.1:3000/idealweight';
            const idealWeightResponse = await fetch(urlIdealWeight, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                height: userData.height,
                gender: userData.gender
                })
            });

            if (!idealWeightResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const idealWeighData = await idealWeightResponse.json();
            console.log(idealWeighData);

            // Update the HTML element for ideal weight
            setTimeout(() => {
                $("#idealWeight").html("Your ideal weight is " + idealWeighData.idealWeight +" kg");
            }, 500);
            // $("#idealWeight").html("Your ideal weight is " + idealWeighData.idealWeight +" kg");

            // Calories burned Calculation
            const urlCalories = 'http://127.0.0.1:3000/caloriesburned';
            const caloriesResponse = await fetch(urlCalories, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                height: userData.height,
                age: userData.age,
                weight: userData.weight,
                gender: userData.gender
                })
            });

            if (!caloriesResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const caloriesData = await caloriesResponse.json();
            console.log(caloriesData);

            // Update the HTML element for calories burned
            setTimeout(() => {
                $("#calories").html("The good news is that you can burn minimum of " + Math.floor(caloriesData.caloriesBurned) + " calories even if you doing nothing.");
            }, 500);
            

            // } catch (error) {
            // console.error('Error:', error);
            // alert('Error fetching data. Please try again later.');
            } finally {
                setTimeout(() => {
                    $("#results").fadeIn();
                    $("#rootBlock").html("<H4>Here are your results:</H4>");
                }, 500);
                
            }

            
        }

    });//$("#calculatorForm").submit END
        
    //Clear the form
    $("#clearButton").click(function(event) {
      // Check if the text fields are not empty
      $("#calculatorForm")[0].reset();
    //   $("#rootBlock").html("");
      $("#bmi").html("");
      $("#bodyFat").html("");
      $("#idealWeight").html("");
      $("#calories").html("");
      $("#results").fadeOut();
      setTimeout(() => {
        fetchDataFromRoot();
        }, 700);
      
    });

    // Add CSS styles to center and style the calculator and results divs
    $("#calculatorForm").css({
        "background-color": "#f5f7ed",
        "margin": "0 auto",
        "max-width": "70%", 
        "padding": "20px",
        "border": "1px solid #ccc",
        "border-radius": "10px",
        "margin-bottom": "20px",
        "display": "flex",
        "flex-wrap": "wrap", // Added to wrap the inner divs
        "justify-content": "space-between" // Changed to space-between
    });

    $("#results").css({
        "background-color": "#f5f7ed",
        "margin": "0 auto",
        "max-width": "70%", 
        "padding": "20px",
        "border": "1px solid #ccc",
        "border-radius": "10px",
        "margin-bottom": "20px",
    });

    $("h1").css({
        "margin": "0 auto",
        "max-width": "70%", 
        "padding": "20px",
        "display": "flex",
        "justify-content": "center"
    });
    
    //Set background image for the body
    $("body").css({
        "background-image": "url('calc_bg.jpg')",
        "background-repeat": "no-repeat",
        "background-size": "cover",
    });

    //Inner divs in calculator form (alignLef and alignRight)
    $("label, input, select").css({
        "margin-top": "10px",
        "margin-bottom": "10px",
        "margin-left": "10px",
        "margin-right": "10px"
    });

    $("label").css({
        "float": "left"
    });
    
    $("input, select").css({
        "float": "right"
    });

    $("#buttonBlock").css({
        "margin": "0 auto",
        "display": "block" // Ensure the buttons are treated as block-level elements
    });

    $("button").css({
        "margin-top": "10px",
        "margin-bottom": "10px",
        "margin-left": "10px",
        "margin-right": "10px"
    });

    $("footer").css({
        "position": "fixed",
        "bottom": "0",
        "left": "0",
        "width": "100%",
        "background-color": "rgb(24, 23, 23)",
        "text-align": "center",
        "color": "rgb(186, 179, 179)",
        "height": "60px",
        "padding": "10px"
    });

    
  }); //$(document).ready END