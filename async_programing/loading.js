let dots = "";
let count = 0;

// Start the loading animation
const loadingInterval = setInterval(() => {
  count++;

  if (dots.length < 3) {
    dots += ".";
  } else {
    dots = "";
  }

  console.log(`Loading${dots}`);
}, 500);

// Stop the animation after 5 seconds
setTimeout(() => {
  clearInterval(loadingInterval);
  console.log("Done!");
}, 5000);