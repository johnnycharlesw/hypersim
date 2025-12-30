// Data state
let state={};

// Main loop
function tick(){
    // Placeholder: print "Hello World!"
    console.log("Hello World!");
}

function mainloop(){
    // call tick function in a loop (works because this JS is server-side)
    while (true) {
        tick();
    }
}

// Entry point
mainloop();