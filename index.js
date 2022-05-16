const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express()
app.use(cors())
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }))

let users = [];

app.post('/updatepos', (req, res) => {
    let body = req.body
    console.log(body)

    if (users[body.id] == undefined) {
        res.send({ error: true })
        return
    }

    users[body.id].lon = body.lon;
    users[body.id].lat = body.lat;

    res.send(users[body.id])
})

app.get("/login", (req, res) => {
    let user = { id: users.length, lon: 0, lat: 0 }

    users.push(user)
    console.log(`New Login: id:${user.id}`)

    res.send(user)
});

app.get("/all", (req, res) => {
    res.send(users)
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});