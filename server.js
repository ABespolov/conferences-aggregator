const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const needle = require('needle');
const cheerio = require('cheerio');
var uniqid = require('uniqid');
const crypto = require('crypto');
const tress = require('tress');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// API calls
app.get('/api/hello', (req, res) => {
    res.send({
        express: 'Hello From Express'
    });
});


app.post('/api/world', (req, res) => {
    let data = {};
    let count = 0;
    const hash = crypto.createHash('sha256');
    const LINK = 'https://events.dev.by';


    needle('get', LINK + '/?page=' + req.body.page)
        .then(function (resp) {
            const $ = cheerio.load(resp.body);

            let collection = $('.data-index-list-events .item');

            collection.each(function () {
                const title = $(this).find('.title').text();
                const link = $(this).find('.title').attr('href');
                const description = $(this).find('p').text();
                const date = $(this).find('time').attr('datetime');
                const id = crypto.createHash('md5').update(title + description + date.toString()).digest("hex");

                data[id] = {
                    'title': title,
                    'link': LINK + link,
                    'description': description,
                    'date': date
                }
            });

            //collection = JSON.stringify(data);
            console.log(Object.entries(data).length === 0);
            if (Object.entries(data).length === 0) {
                res.send({end: true});
            } else {
                res.send(data);
            }


        })
        .catch(function (err) {
            // ...
        });


});


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));