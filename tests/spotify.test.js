const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = require('../spotify.js');

describe('Teste do cliente Spotify', () => {
    describe('Teste do cliente Spotify', () => {
        test('Deve autenticar o cliente do Spotify e definir o token de acesso', async () => {
            ;
            await expect(new Promise(resolve => {
                spotifyApi.clientCredentialsGrant()
                    .then(data => {
                        spotifyApi.setAccessToken(data.body.access_token);
                        resolve(spotifyApi.getAccessToken());
                    })
                    .catch(error => {
                        console.log('Erro ao autenticar o cliente:', error);
                    });
            })).resolves.toBeTruthy();
        });
    });

    beforeAll(async () => {
        await spotifyApi.clientCredentialsGrant();
        console.log('Cliente autenticado com sucesso!');
    });

    test('Deve pesquisar por uma faixa de música', async () => {
        expect.assertions(2);
        const response = await spotifyApi.searchTracks('Despacito');
        expect(response.statusCode).toBe(200);
        expect(response.body.tracks.items.length).toBeGreaterThan(0);
    });
});
