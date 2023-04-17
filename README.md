Como executar

Clone o repositório do projeto em sua máquina:
git clone https://github.com/leandrocesar002/Spotify-backend.git

Navegue para a pasta do projeto:
cd Spotify-backend

Instale as dependências:
npm install

Inicie o servidor:
npm start

O servidor será iniciado e estará disponível em http://localhost:3000.

Como usar
Faça uma requisição POST para http://localhost:3000 com um payload contendo a temperatura desejada, no formato abaixo:

json
Copy code
{
  "temperature": 8
}
O servidor irá retornar um objeto JSON contendo o estilo de cerveja mais adequado para a temperatura e a playlist correspondente, no formato abaixo:

json
Copy code
{
  "beerStyle": "Stout",
  "playlist": {
    "name": "Stout Lovers",
    "tracks": [
      {
        "name": "Stout Hearted Man",
        "artist": "Mark Lanegan",
        "link": "https://open.spotify.com/track/6RZj6U1G6QFfjVKnLntRzu"
      },
      {
        "name": "Blood & Thunder",
        "artist": "Mastodon",
        "link": "https://open.spotify.com/track/3qzGvmfJJro8Xzg9X1nY2R"
      },
      ...
    ]
  }
}


Licença
Este projeto está licenciado sob a licença MIT - consulte o arquivo LICENSE para obter detalhes.