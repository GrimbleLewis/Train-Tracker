
var config = {
    apiKey: "AIzaSyAgPpSAtqmjciU2PlPUS8_ABfKQiC5-qao",
    authDomain: "train-tracker-65183.firebaseapp.com",
    databaseURL: "https://train-tracker-65183.firebaseio.com",
    projectId: "train-tracker-65183",
    storageBucket: "train-tracker-65183.appspot.com",
    messagingSenderId: "671769592912"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

 // collects the info from the form on submit button click
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format('HH:mm');
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
       name: trainName,
       destination: destination,
       time: trainTime,
       frequency: frequency
    };
    // pushes new train info from the forms to firebase 
    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });

  
 
  // collects the already stored data on firebase and pushes it onto the webpage
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    
  
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;


    var currentTime = moment();

    var nextTrain;
  

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);


    var trainTimePretty = moment(trainTime, "HH:mm")
    console.log(trainTimePretty)
    var minutesTilNextTrain;
  // displays the time of the next train based on the frequency and the first arrival time of the train
    if (trainTimePretty > currentTime) {
        nextTrain = trainTimePretty;
        minutesTilNextTrain = trainTimePretty.diff(currentTime, 'minutes');;
    } else {
        var minutesPast = currentTime.diff(trainTimePretty, 'minutes');
        var remainder = minutesPast % frequency;
        minutesTilNextTrain = frequency - remainder;
        nextTrain = currentTime.add(minutesTilNextTrain, 'minutes');
    }
    console.log(minutesPast)

    console.log(frequency)

    console.log(remainder)

    console.log(minutesTilNextTrain)
// collects information from firebase and the if/else statement to put into new table row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain.format('HH:mm')),
        $("<td>").text(minutesTilNextTrain)
    );

// appends new row to the table body
$("#train-table > tbody").append(newRow);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

