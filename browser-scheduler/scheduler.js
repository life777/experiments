const action = () => {
    let all = 0;
    
    for (let i = 0; i < 10000; ++i) {
        let els = document.querySelectorAll(".animate");
        for (let j = 0; j < els.length; ++j) {
            all += els[j].dataset.data ? 0 : 1;
        }
    }

    console.log(all);
};

let tasksSignal;
document.addEventListener("click", () => {
    if (tasksSignal) {
        tasksSignal.abort(new Error("another action is started"));
    }

    tasksSignal = new TaskController({priority: 'user-blocking'});
    tasksSignal.signal.addEventListener("prioritychange", e => {
        console.log("prioritychange", e.previousPriority, e.target.priority);
    });
    tasksSignal.setPriority("user-blocking");

    console.time("task");
    console.time("task-start");
    scheduler.postTask(() => {
        console.timeEnd("task-start");
        console.time("task-action");
        action();
        console.timeEnd("task-action");
    }, { priority: "background", delay: 1000 , signal: tasksSignal.signal })
        .then(() => {
            console.timeEnd("task");
        });
});

let elems = document.getElementsByClassName("animate");
const animate = (deg) => {
    requestAnimationFrame(() => {
        for (let i = 0; i < elems.length; ++i) {
            elems[i].style.transform = `rotate(${ deg }deg)`;
        }

        animate(deg + 2);
    });
}

animate(0);





let taskSignal = new TaskController({ priority: 'user-blocking' });
scheduler.postTask(() => {
    console.log("Real action");
}, {
    priority: "background", // user-blocking, user-visible, background
    delay: 1000,
    signal: tasksSignal.signal
})
    .then(() => {
        console.log("Done")
    });

// a few precious seconds after
taskSignal.abort();