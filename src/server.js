const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Read the items from the JSON file
const itemsData = fs.readFileSync('src/items.json');
const {items} = JSON.parse(itemsData);

app.get('/items', (req, res) => {
    const {q} = req.query;

    if (q) {
        const filteredItems = items.filter(item => item.toLowerCase().includes(q.toLowerCase()));
        res.json(filteredItems);
    }

    res.json(items);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });