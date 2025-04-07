function dynamicClock(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let am_pm = hours >= 12 ? 'PM' : 'AM';
  
    //to convert  12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    return `${hours}:${minutes}:${seconds} ${am_pm}`;
  }
  
  function showTime() {
    const now = new Date();
    const timeString = dynamicClock(now);
    console.log(`Current Time: ${timeString}`);
  }
  
  // Update every second
  setInterval(showTime, 1000);
  