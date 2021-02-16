const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Classifier } = require('ml-classify-text');
const classifier = new Classifier()
const fs = require('fs');
var translate = require('translation-google');

app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;


let negatives;
let positives;



//function that loads the stage and return a Promise
const readFile = file => new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
        err ? reject(err) : resolve(JSON.parse(data))
    });
})

//function that write a file and return a new Promise
const writeFile = (file, content) => new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(content), (err) => {
        err ? reject(err) : resolve('added to stage')
    });
})

app.post('/negative', (req, res) => {

    var negative = req.body.negative;
    translate(negative, {to: 'en'}).then(res => {
        negative = res.text;

        readFile('./negatives.json')
        .catch((err) => { console.log(err) })
        .then((neg) => {
            negatives = neg;
            negatives.push(negative)
            writeFile('./negatives.json', negatives)
        })

    }).catch(err => {
        console.error(err);
    });

    res.send('ok')
})

app.post('/positive', (req, res) => {
    var positive = req.body.positive;

    translate(positive, {to: 'en'}).then(res => {
        positive = res.text;

        readFile('./positives.json')
        .catch((err) => { console.log(err) })
        .then((pos) => {
            positives = pos;
            positives.push(positive)
            writeFile('./positives.json', positives)
        })

    }).catch(err => {
        console.error(err);
    });

    res.send('ok')
})

app.get('/getPrediction', (req, res) => {

    var phrase =  req.body.phrase;
    translate(phrase, {to: 'en'}).then(p => {
        phrase = p.text;


        readFile('./positives.json')
        .catch((err) => { console.log(err) })
        .then((pos) => {
            positives = pos;
            classifier.train(positives, 'positive')
        })
        
        readFile('./negatives.json')
        .catch((err) => { console.log(err) })
        .then((neg) => {
            negatives = neg;
            classifier.train(negatives, 'negative');
            let predictions = classifier.predict(phrase)
            if (predictions.length) {
                predictions.forEach(prediction => {
                    //console.log(`${prediction.label} (${prediction.confidence})`)
                    res.send({
                        label: prediction.label, 
                        confidence: prediction.confidence
                    })
                })
            } else {
                res.send('No predictions returned')
            }
        })

    }).catch(err => {
        console.error(err);
    });


})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})