const SpotifyWebApi = require('spotify-web-api-node');

// Configurações do Spotify
const spotifyApi = new SpotifyWebApi({
    clientId: '340fa9017d0c43b4a1e03b9e5790a948',
    clientSecret: 'a9f3fb4ba6594143a999ed91c54aa291',
});

// Autentica o cliente e obtém um token de acesso válido
spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body.access_token);
        // console.log('Cliente autenticado com sucesso!');
    })
    .catch(error => {
        console.log('Erro ao autenticar o cliente:', error);
    });

module.exports = spotifyApi;