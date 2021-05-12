const express = require('express')
const app = express()
const port = 8888
const getFirebaseApp = require('./firebaseFunction')

const admin = getFirebaseApp.getFirebaseApp()

var cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '50mb' }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '50mb',
    extended: true,
}))
app.use(cors())



app.post('/saveAddress', (req, res) => {
    getFirebaseApp.createAccountAddress(admin,req).then((response) => {
        res.json(response)
    })
})

app.get('/viewAllAddress', (req, res) => {
    getFirebaseApp.viewAllAddress(admin).then((response) => {
        res.json(response)
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
