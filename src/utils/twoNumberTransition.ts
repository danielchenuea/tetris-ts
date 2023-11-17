interface configNumberTransition{
    transitionDelay: number
}

// https://stackoverflow.com/questions/16994662/count-animation-from-number-a-to-b
export function transitionTwoNumbers(id: string, startPoint: number, endPoint: number, config?: configNumberTransition) : void {

    var obj = document.getElementById(id)!;
    const range = endPoint - startPoint;
    // const end = startPoint + pointIncrease;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    const duration = config ? config.transitionDelay : 300;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));
    
    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);
    
    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer : NodeJS.Timeout;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(endPoint - (remaining * range));
        obj.innerText = value.toString();
        if (value == endPoint) {
            clearInterval(timer);
        }
    }
    timer = setInterval(run, stepTime);
    run();
}