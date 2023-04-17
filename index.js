const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = process.env.PORT || 3000;

// Configurações do Spotify
const spotifyApi = new SpotifyWebApi({
    clientId: '340fa9017d0c43b4a1e03b9e5790a948',
    clientSecret: 'a9f3fb4ba6594143a999ed91c54aa291',
});

// Autentica o cliente e obtém um token de acesso válido
spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body.access_token);
        console.log('Cliente autenticado com sucesso!');
    })
    .catch(error => {
        console.log('Erro ao autenticar o cliente:', error);
    });
// Configurações da API
app.use(bodyParser.json());



// Get all beer styles
app.get('/beer-styles', (req, res) => {
    res.json(beerStyles);
});

// Get a beer style by id
app.get('/beer-styles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const style = beerStyles.find((s) => s.id === id);
    if (style) {
        res.json(style);
    } else {
        res.status(404).json({ message: "Style not found" });
    }
});

// Create a new beer style
app.post('/beer-styles', (req, res) => {
    const style = req.body;
    const id = beerStyles.length + 1;
    style.id = id;
    beerStyles.push(style);
    res.status(201).json(style);
});

// Update a beer style by id
app.put('/beer-styles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const styleIndex = beerStyles.findIndex((style) => style.id === id);
    if (styleIndex === -1) {
        res.status(404).json({ message: "Style not found" });
    } else {
        const style = req.body;
        if (!style.name && !style.minTemp && !style.maxTemp) {
            res.status(400).json({ message: "Bad request" });
        } else {
            const updatedStyle = { ...beerStyles[styleIndex], ...style };
            beerStyles[styleIndex] = updatedStyle;
            res.json(updatedStyle);
        }
    }
});

// Delete a beer style by id
app.delete('/beer-styles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const styleIndex = beerStyles.findIndex((style) => style.id === id);
    if (styleIndex === -1) {
        res.status(404).json({ message: "Style not found" });
    } else {
        beerStyles.splice(styleIndex, 1);
        res.json({ message: "Style deleted" });
    }
});




app.get('/', (req, res) => {
    res.send('API da Máquina Cervejeira');
});

app.post('/beer', async (req, res) => {
    const temperature = req.body.temperature;

    // Lista de estilos de cerveja com suas temperaturas mínimas e máximas
    const beerStyles = [
        { id: 1, name: "Pilsen", minTemp: -4, maxTemp: 6 },
        { id: 2, name: "IPA", minTemp: -6, maxTemp: 7 },
        { id: 3, name: "Stout", minTemp: 6, maxTemp: 8 },
        { id: 4, name: "Pale Ale", minTemp: -5, maxTemp: 5 },
        { id: 5, name: "Weissbier", minTemp: -3, maxTemp: 5 },
        { id: 6, name: "Dunkel", minTemp: 4, maxTemp: 6 },
    ];

    // Calcula a média das temperaturas dos estilos de cerveja
    const avgTemps = beerStyles.map(style => (style.minTemp + style.maxTemp) / 2);

    // Seleciona o estilo mais próximo da temperatura informada na entrada
    let selectedStyleIndex = 0;
    let minDiff = Math.abs(avgTemps[selectedStyleIndex] - temperature);

    for (let i = 1; i < avgTemps.length; i++) {
        const diff = Math.abs(avgTemps[i] - temperature);

        if (diff < minDiff) {
            selectedStyleIndex = i;
            minDiff = diff;
        }
    }

    let selectedStyle = beerStyles[selectedStyleIndex];

    // Ordena os estilos de cerveja por ordem alfabética em caso de empate
    const matchingStyles = beerStyles.filter(style => {
        const avgTemp = (style.minTemp + style.maxTemp) / 2;
        return Math.abs(avgTemp - temperature) === minDiff;
    });

    matchingStyles.sort((a, b) => a.name.localeCompare(b.name));
    selectedStyle = matchingStyles[0];

    // Busca a playlist no Spotify que contenha o nome do estilo selecionado
    const playlists = await spotifyApi.searchPlaylists(selectedStyle.name);

    let playlist = null;

    for (let i = 0; i < playlists.body.playlists.items.length; i++) {
        const item = playlists.body.playlists.items[i];

        if (item.name.toLowerCase().includes(selectedStyle.name.toLowerCase())) {
            playlist = {
                name: item.name,
                tracks: [],
            };

            const tracks = await spotifyApi.getPlaylistTracks(item.id);

            tracks.body.items.forEach(track => {
                playlist.tracks.push({
                    name: track.track.name,
                    artist: track.track.artists[0].name,
                    link: track.track.external_urls.spotify,
                });
            });

            break;
        }
    }

    if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found.' });
    }

    return res.json({ beerStyle: selectedStyle.name, playlist });
});

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});