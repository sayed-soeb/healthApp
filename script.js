function setMedicineReminder() {
    var selectedTime = document.getElementById("medicine-time").value;
    var storedReminders = JSON.parse(localStorage.getItem("medicineReminders")) || [];
  
    // Add the new reminder time to the array
    storedReminders.push(selectedTime);
  
    // Store the updated reminders array in local storage
    localStorage.setItem("medicineReminders", JSON.stringify(storedReminders));
  
    // Display confirmation message
    alert("Reminder set successfully!");
  
    // Refresh the reminder display
    displayMedicineReminders();
  
    // Start the reminder check interval
    startReminderCheck();
  }
  
  
  function deleteMedicineReminder(index) {
    var storedReminders = JSON.parse(localStorage.getItem("medicineReminders"));
  
    if (storedReminders && storedReminders.length > index) {
      storedReminders.splice(index, 1);
      localStorage.setItem("medicineReminders", JSON.stringify(storedReminders));
      displayMedicineReminders();
    }
  }
  
  
  function displayMedicineReminders() {
    var storedReminders = JSON.parse(localStorage.getItem("medicineReminders"));
    var reminderContainer = document.getElementById("reminder-container");
  
    reminderContainer.innerHTML = "";
  
    if (storedReminders && storedReminders.length > 0) {
      for (var i = 0; i < storedReminders.length; i++) {
        // Create the reminder element
        var reminderItem = document.createElement("div");
        reminderItem.classList.add("reminder-item");
  
        // Create the time element
        var timeElement = document.createElement("span");
        timeElement.classList.add("time");
        timeElement.textContent = "Reminder: " + storedReminders[i];
  
       // Create the delete button
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "\u{1F5D1}"; // Unicode representation of trash icon
        deleteButton.addEventListener("click", deleteMedicineReminder.bind(null, i));


        // Append the elements to the reminder item
        reminderItem.appendChild(timeElement);
        reminderItem.appendChild(deleteButton);
  
        // Append the reminder item to the container
        reminderContainer.appendChild(reminderItem);
      }
    } else {
      // No reminders set, display a message
      reminderContainer.innerHTML = "<p>No reminders set.</p>";
    }
  }
  
  
  
  
  function calculateBMI() {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value / 100; // Convert height from cm to meters
  
    var bmi = weight / (height * height);
    var bmiContainer = document.getElementById("bmi-container");
    var bmiCircle = document.getElementById("bmi-circle");
    var bmiValue = document.getElementById("bmi-value");
    var bmiResult = document.getElementById("bmi-result");
  
    bmiValue.textContent = bmi.toFixed(2);
  
    if (bmi < 18.5) {
      bmiCircle.classList.remove("healthy", "unhealthy");
      bmiCircle.classList.add("underweight");
      bmiResult.textContent = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCircle.classList.remove("underweight", "unhealthy");
      bmiCircle.classList.add("healthy");
      bmiResult.textContent = "Healthy";
    } else {
      bmiCircle.classList.remove("underweight", "healthy");
      bmiCircle.classList.add("unhealthy");
      bmiResult.textContent = "Overweight";
    }
  }
  
  function displayDietPlan() {
    var problemSelector = document.getElementById("problem-selector");
    var selectedProblem = problemSelector.value;
    var dietPlanContainer = document.getElementById("diet-plan-container");
  
    dietPlanContainer.innerHTML = "";
  
    // Create the diet plan element
    var dietPlanItem = document.createElement("div");
    dietPlanItem.classList.add("diet-plan-item");
  
    // Create the food element
    var foodElement = document.createElement("span");
    foodElement.classList.add("food");
  
    if (selectedProblem === "normal") {
      foodElement.innerHTML =
        "<strong>Diet Plan:</strong> <br>" +
        "- Dal, Roti, Sabzi <br>" +
        "- Rice, Dal, Salad <br>" +
        "- Idli, Sambar, Chutney";
    } else if (selectedProblem === "diabetes") {
      foodElement.innerHTML =
        "<strong>Diet Plan:</strong> <br>" +
        "- Bitter gourd, Chapati, Curd <br>" +
        "- Quinoa, Green vegetables <br>" +
        "- Fenugreek seeds, Fish";
    } else if (selectedProblem === "hypertension") {
      foodElement.innerHTML =
        "<strong>Diet Plan:</strong> <br>" +
        "- Oats, Banana, Yogurt <br>" +
        "- Spinach, Salmon, Avocado <br>" +
        "- Garlic, Beetroot juice";
    }
  
    // Append the food element to the diet plan item
    dietPlanItem.appendChild(foodElement);
  
    // Append the diet plan item to the container
    dietPlanContainer.appendChild(dietPlanItem);
  }
  
  var alarmSound = document.getElementById("alarm-sound");
  var alarmInterval;
  
  function startReminderCheck() {
    var storedReminders = JSON.parse(localStorage.getItem("medicineReminders"));
  
    if (storedReminders) {
      alarmInterval = setInterval(function () {
        var currentDate = new Date();
        var currentTime = currentDate.getHours().toString().padStart(2, "0") + ":" + currentDate.getMinutes().toString().padStart(2, "0");
  
        for (var i = 0; i < storedReminders.length; i++) {
          if (currentTime === storedReminders[i]) {
            console.log("Alarm time: " + storedReminders[i] + " | Current time: " + currentTime);
            showAlarmPopup();
            playAlarm();
            break; // Stop checking for other alarms once one is found
          }
        }
      }, 1000);
    }
  }
  
  function showAlarmPopup() {
    var popup = document.getElementById("alarm-popup");
    var message = document.getElementById("alarm-message");
    var stopButton = document.getElementById("alarm-stop");
  
    message.textContent = "Medicine time";
  
    popup.style.display = "block";
  
    stopButton.addEventListener("click", function () {
      hideAlarmPopup();
      stopAlarm();
    });
  }
  
  function hideAlarmPopup() {
    var popup = document.getElementById("alarm-popup");
    popup.style.display = "none";
  }
  
  function playAlarm() {
    alarmSound.play();
  }
  
  function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearInterval(alarmInterval);
  }
  
  
  
  
  
  
  function stopReminderCheck() {
    clearInterval(startReminderCheck);
  }
  
  
  document.getElementById("set-reminder-btn").addEventListener("click", setMedicineReminder);
  document.getElementById("calculate-bmi-btn").addEventListener("click", calculateBMI);
  document.getElementById("problem-selector").addEventListener("change", displayDietPlan);
  
  // Check if a medicine reminder is already set in local storage
  displayMedicineReminders();
   // Start the reminder check interval
   startReminderCheck();
  