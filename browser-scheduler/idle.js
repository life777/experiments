let taskId = requestIdleCallback(idleDeadline => {
    console.log(idleDeadline.didTimeout);
    console.log(idleDeadline.timeRemaining());
    // do some job
}, { timeout: 1000 });


// we don't need this task any more
cancelIdleCallback(taskId);