let executeables = []
exports.addTimingEvent = (handle) =>
{
    executeables.push(handle)
}

window.onload = () =>
{
    for(var i = 0; i <= executeables.length - 1; i++)
    {
        executeables[i]()
    }
}