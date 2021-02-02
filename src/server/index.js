const path = require('path')
const express = require('express')
const bodyParser = require("body-parser");
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors')
const fetch = require("node-fetch");
const app = express();

const port = process.env.PORT;
const api_key = process.env.API_KEY;
const base_url = process.env.BASE_URL;
const lang = process.env.LANG;



app.use(express.static('dist'))
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
   
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Get meaning cloud data
const getDataFromMeaningCloud = async (url = "") => {
    const response = await fetch(url);
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

app.post('/meaningCloud', postMeaningCloudData);

async function postMeaningCloudData(req, res){
    
        // Construct URL
    const userLink = req.body.url
        
    const url = `${base_url}key=${api_key}&lang=${lang}&url=${userLink}`;
    const meaningCloudData = await getDataFromMeaningCloud(url);
    // console.log("meaningCloudData:=>",meaningCloudData);
    const outputMeaningCloudObj = {
        model : meaningCloudData.model,
        score_tag : meaningCloudData.score_tag,
        agreement : meaningCloudData.agreement,
        subjectivity : meaningCloudData.subjectivity,
        confidence : meaningCloudData.confidence,
        irony : meaningCloudData.irony,
        sentence_list : meaningCloudData.sentence_list[0].text
        }
        console.log("outputMeaningCloudObj==>",outputMeaningCloudObj);
        res.send(outputMeaningCloudObj);
    }