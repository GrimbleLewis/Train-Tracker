
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

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });

  
 

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;


    var currentTime = moment();

    var nextTrain;
  
    // var trainTimePretty = moment.unix(trainTime).format("X")

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);


    console.log(currentTime)

    var trainTimePretty = moment(trainTime, "HH:mm")
    console.log(trainTimePretty)

  
    if (trainTime > currentTime) {
        nextTrain = trainTime;
        minutesTilNextTrain = remainder;
    } else {
        var minutesPast = currentTime.diff(trainTimePretty, 'minutes');
        var remainder = minutesPast % frequency;
        var minutesTilNextTrain = frequency - remainder;
        nextTrain = currentTime.add(minutesTilNextTrain, 'minutes');
    }
    console.log(minutesPast)

    console.log(frequency)

    console.log(remainder)

    console.log(minutesTilNextTrain)

    console.log(minutesPast)
    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain.format('HH:mm')),
        $("<td>").text(minutesTilNextTrain)
    );

$("#train-table > tbody").append(newRow);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

