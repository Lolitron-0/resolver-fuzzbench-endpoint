import {get, set} from '@vercel/kv';
import express from 'express';
const app = express()
const port = 3000

let resolvedMap = new Map();
let idCounter = 0;

app.post("/unset", async (req, res) => {
	const id = await get("id_counter");
	await set(id.toString(), 0);
	res.send(id.toString());
	await set('id counter', id + 1)
})

app.post("/set/:id", async (req, res) => {
	await set(parseInt(req.params["id"]), 1);
	res.send("ok")
})

app.get("/get/:id", async (req, res) => {
	const resolveStatus = await get(req.params["id"])
	res.send(resolveStatus.toString())
})


app.listen(port, async () => {
	console.log(`Example app listening on port ${port}`)
	await set("id_counter", 0)
	console.log("Initial id_counter set")
})

module.export = app
