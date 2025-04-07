let count = 10;

const decrease = setInterval(() => {
  if (count > 0) {
    console.log(count);
    count--;
  } else {
    console.log("Time’s up!");
    clearInterval(decrease);
  }
}, 500); 
