export function transitionTwoNumbers(id, startPoint, endPoint, config) {
    var obj = document.getElementById(id);
    const range = endPoint - startPoint;
    var minTimer = 50;
    const duration = config ? config.transitionDelay : 300;
    var stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
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
