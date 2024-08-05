const express = require('express')
const app = express()
const port = 3000

let resolved = false

app.post("/unset", (req, res) => {
	resolved = false
	res.send("ok");
})

app.post("/set", (req, res) => {
	resolved = true;
	res.send("ok")
})

app.get("/get", (req, res) => {
	res.send(resolved ? "1" : "0")
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

module.export = app
