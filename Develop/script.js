$(function () {
  // display the current date at the top of the calendar.
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // create time blocks for each hour from 12 PM to 5 PM
  for (let hour = 12; hour <= 17; hour++) {
    const timeBlock = $("<div>")
      .attr("id", `hour-${hour}`)
      .addClass("row time-block")
      .appendTo($(".container-fluid"));

    const hourDiv = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(hour === 12 ? `${hour}PM` : hour < 12 ? `${hour}AM` : `${hour - 12}PM`)
      .appendTo(timeBlock);

    const descriptionTextArea = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", 3)
      .appendTo(timeBlock);

    const saveButton = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"))
      .appendTo(timeBlock);
  }

  // function to update time-block color coding based on the current time
  function updateHourlyColors() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // initialize time-block color coding.
  updateHourlyColors();

  // load saved events from local storage and set them in the text areas.
  $(".time-block").each(function () {
    var blockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(blockId);
    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });

  // save button click event to save the event description to local storage.
  $(".saveBtn").on("click", function () {
    var blockId = $(this).parent().attr("id");
    var eventDescription = $(this).siblings(".description").val();
    localStorage.setItem(blockId, eventDescription);
  });

  // periodically update the time-block colors to reflect the current time.
  setInterval(updateHourlyColors, 60000); // update every minute.
});

