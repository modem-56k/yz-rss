const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/feeds', async (req, res) => {
    const feeds = fs.readFileSync('feed.txt', 'utf-8').split('\n').map(line => {
        const [name, url] = line.split(',');
        return { name, url };
    });

    const feedData = [];
    for (let feed of feeds) {
        try {
            const response = await axios.get(feed.url);
            const result = await xml2js.parseStringPromise(response.data);
            const items = result.rss.channel[0].item;
            items.forEach(item => {
                feedData.push({
                    title: item.title[0],
                    description: item.description[0],
                    feedName: feed.name
                });
            });
        } catch (e) {
            console.error(`Error fetching ${feed.url}:`, e.message);
        }
    }
    
    feedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(feedData);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
