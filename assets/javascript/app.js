
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
    var trainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName,
        destination,
        trainTime,
        frequency
    });
  

  });

  
  

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());





}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

