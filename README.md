A aplicação Spotify-backend é uma API que permite ao usuário receber sugestões de playlists do Spotify de acordo com a temperatura informada. Através da temperatura informada, a API retorna uma sugestão de estilo de cerveja e uma playlist relacionada a esse estilo, e tambem conta com um crud local para fazer algumas alterações de put delete update e create na sua base de cervejaria 

A API utiliza a biblioteca Spotify Web API para buscar playlists do Spotify e manipular as informações recebidas, além de utilizar a biblioteca Express para criar a API em Node.js.



A aplicação utiliza variáveis de ambiente para as credenciais do Spotify, e possui um script que permite a execução local do servidor.

**O projeto está em deploy na plataforma https://render.com na seguinte URL https://spotify-backend-full.onrender.com, todas as requisições podem ser feitas atraves dele, mas caso queira rodar localmente irei deixar um passo a passo abaixo.**


**Como executar**

**Clone o repositório do projeto em sua máquina:**
git clone https://github.com/leandrocesar002/Spotify-backend.git

**Navegue para a pasta do projeto:**
cd Spotify-backend

**Instale as dependências:**
npm install

**Inicie o servidor:**
npm start

O servidor será iniciado e estará disponível em http://localhost:3000.

**Como usar:**
Faça uma requisição POST para http://localhost:3000 com um payload contendo a temperatura desejada, no formato abaixo:

```json
{
  "temperature": 8
}
```

O servidor irá retornar um objeto JSON contendo o estilo de cerveja mais adequado para a temperatura e a playlist correspondente, no formato abaixo:

```json
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
```



**Este projeto está licenciado sob a licença MIT - consulte o arquivo LICENSE para obter detalhes.**
