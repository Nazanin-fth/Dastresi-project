// Counting down to
var countDownDate = new Date("Sep 7, 2030 16:07:16").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result
  let output = hours + ":" + minutes + ":" + seconds;
  document.getElementById("timer-1").innerHTML = toPersianDigits(output);

  // If the count down is over
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer-1").innerHTML = "منقضی شده";
  }
}, 1000);
// Convert English digits to Persian digits
function toPersianDigits(str) {
  return str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}
