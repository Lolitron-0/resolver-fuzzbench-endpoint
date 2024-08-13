const kv = require('@vercel/kv').kv
const express = require('express')
const app = express()
const port = 8080

let resolvedMap = new Map();
let idCounter = 0;

app.post("/unset", async (req, res) => {
	const id = await kv.get("id_counter");
	await kv.set(id.toString(), 0);
	const kvresp = await kv.set('id_counter', id + 1)
	res.send(id.toString());
})

app.post("/set/:id", async (req, res) => {
	await kv.set(parseInt(req.params["id"]), 1);
	res.send("ok")
})

app.get("/get/:id", async (req, res) => {
	const resolveStatus = await kv.get(req.params["id"])
	res.send(resolveStatus.toString())
})


app.listen(port, async () => {
	console.log(`Example app listening on port ${port}`)
	const resp = await kv.get("id_counter")
	if (!resp) {
		await kv.set("id_counter", 0)
	}
	console.log("Initial id_counter set")
})

module.export = app
