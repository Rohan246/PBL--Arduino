const udp = require("dgram")

var server;

var error = false;

var init = false;

exports.initalizeServer = (port, handle) =>
{
    init = true

    server = udp.createSocket("udp4")

    server.on("error", (err) => 
    {
        console.log("Server error:\n${err.stack}");
        server.close();

        handle("error", err);
    })

    server.on("message", (msg, rinfo) => 
    {
        console.log("Received data:\n" + msg + " From: " + rinfo.address)

        handle("data", msg)
    })

    server.on("listening", () => 
    {
        console.log("Listening")
    })

    handle("active", null) 
}

exports.sendData = (port, data) =>
{
    let error = false;

    if(init)
    {
        server.send(Buffer.from(data), port, document.getElementById("ipfield").value, (err) => 
        {
            error = true
        
            return err 
        })

        if(!error)
        {
            return true
        }
    }
}

exports.close = () =>
{
    if(init)
    {
        console.log("Connection closed")
        
        server.close()
    }
}

