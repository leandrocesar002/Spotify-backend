const express = require('express');
const spotifyApi = require('../spotify');

const router = express.Router();

router.post('/', async (req, res) => {
    const temperature = req.body.temperature;

    const beerStyles = [
        { id: 1, name: "Pilsen", minTemp: -4, maxTemp: 6 },
        { id: 2, name: "IPA", minTemp: -6, maxTemp: 7 },
        { id: 3, name: "Stout", minTemp: 6, maxTemp: 8 },
        { id: 4, name: "Pale Ale", minTemp: -5, maxTemp: 5 },
        { id: 5, name: "Weissbier", minTemp: -3, maxTemp: 5 },
        { id: 6, name: "Dunkel", minTemp: 4, maxTemp: 6 },
    ];

    const avgTemps = beerStyles.map(style => (style.minTemp + style.maxTemp) / 2);

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

    const matchingStyles = beerStyles.filter(style => {
        const avgTemp = (style.minTemp + style.maxTemp) / 2;
        return Math.abs(avgTemp - temperature) === minDiff;
    });

    matchingStyles.sort((a, b) => a.name.localeCompare(b.name));
    selectedStyle = matchingStyles[0];

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

module.exports = router;
