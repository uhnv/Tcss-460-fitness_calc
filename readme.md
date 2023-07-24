This is the project that shows client-server iteration.
The client side code is in the node.js file.
Server side has 5 routes (one additional to the description, the root node)

Client side UI:
Client side is the simpleclean interface that utilizes the scope of technologes that I learned during TCSS-460.
It has some features that implemented with jQuery, such as fadeIn, and fadeOut that user can see when the results of calculation show up or cleared with the "clear" button.
To provide smooth fade in and fade out timeOut was used. That allowed to make transition between different information in the result section seamless and smooth.

Client side script:
The script of the client side it activated after the user clics "Calculate" or "Clear" button, and also when the page is loaded.
First of all after the page is loaded the client sidee sends the request to root "/", and gets the HTML result which is displayet in the result section of the page.
Afte the user enters the correct data inthe form section of the page, and clicks the calculate button the request to "/bmi" end point is send.
The server side waith the respons and then it uses the bni dato to calculate "body fat". When the data from "/bmi" received, client script sends it to the "/bodyfat".
After that it makes another request to "/idealweight" and then to "/caloriesburned"  end points.

Each request is asynchronous, and they are implemented using await operator.
