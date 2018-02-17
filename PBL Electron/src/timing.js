let executeables = []
exports.addTimingEvent = (handle) =>
{
    executeables.push(handle)
}

// ISSUE TO SOLVE: Multiple "window.onload"s causes overridding; solution needs to be created

window.onload = () =>
{
    console.log("CNT") // DEBUG
    for(var i = 0; i <= executeables.length; i++)
    {
        console.log(typeof(executeables[i])) // DEBUG
        executeables[i]()
    }
}