const express = require('express');
var cors = require('cors');
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3001;

// app.use(express.json())
app.use(cors());

app.get('/image', async (req, res) => {
    const breedId = req.query.breed_id;
    const urlBase = "https://api.thedogapi.com/v1/images/search";
    const url = breedId == 0 ? urlBase : urlBase.concat(`?breed_id=${breedId}`);
    console.log(url);
    const imageUrl = await axios.get(url, {
        headers: {
            "x-api-key": process.env.API_KEY
        }
    }).then(response => {
        if (response.data.length == 0) return "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Datadog_logo.svg/1200px-Datadog_logo.svg.png";
        return response.data[0].url;
    });
    console.log(`imageUrl: ${imageUrl}`);
    res.json({ imageUrl: imageUrl });
});

app.get('/breeds', async (req, res) => {
    const breeds = await axios.get("https://api.thedogapi.com/v1/breeds", {
        headers: {
            "x-api-key": process.env.API_KEY
        }
    }).then(response => {
        return response.data.map(breed => { return { "id": breed.id, "name": breed.name } });
    });
    res.json({ breeds: breeds });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

