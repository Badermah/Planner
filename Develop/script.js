// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // Get current date from Moment.js
    const currentDate = dayjs().format("dddd, MMMM D");
    // Display current date on the page
    $("#currentDay").text(currentDate);
  
    // Get current hour from Moment.js
    const currentHour = dayjs().hour();
  
    // Loop over each time block
    $(".time-block").each(function () {
      // Get the hour for this time block from its id
      const blockHour = parseInt($(this).attr("id").split("-")[1]);
  
      // Add/remove classes based on past, present, future status
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  
    // Handle save button click event
    $(".saveBtn").on("click", function () {
      // Get the description for this time block
      const description = $(this).siblings(".description").val().trim();
      // Get the hour for this time block from its id
      const hour = $(this).parent().attr("id");
  
      // Save the description to local storage
      localStorage.setItem(hour, description);
    });
  
    // Load saved descriptions from local storage
    $(".time-block").each(function () {
      const hour = $(this).attr("id");
      const description = localStorage.getItem(hour);
  
      if (description !== null) {
        $(this).children(".description").val(description);
      }
    });
  });
