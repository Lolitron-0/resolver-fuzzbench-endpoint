const express = require('express')
const app = express()
const port = 3000

let resolvedMap = new Map();
let idCounter = 0;

app.post("/unset", (req, res) => {
	idCounter+=1;
	resolvedMap.set(idCounter, false)
	res.send(idCounter.toString());
})

app.post("/set/:id", (req, res) => {
	resolvedMap.set(parseInt(req.params["id"]), true);
	res.send("ok")
})

app.get("/get/:id", (req, res) => {
	res.send(resolvedMap.get(parseInt(req.params["id"])) ? "1" : "0")
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

module.export = app
