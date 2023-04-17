const request = require('supertest');
const express = require('express');
const router = require("../index");
const spotifyApi = require('../spotify');

jest.mock('../spotify');

const app = express();
app.use(express.json());
app.use('/beer', router);

describe('POST /', () => {
  test('should return 200 OK with playlist for beer style', async () => {
    const mockSearchPlaylists = jest.spyOn(spotifyApi, 'searchPlaylists').mockResolvedValue({
      body: {
        playlists: {
          items: [
            {
              id: '1',
              name: 'Pilsen Playlist',
            },
          ],
        },
      },
    });

    const mockGetPlaylistTracks = jest.spyOn(spotifyApi, 'getPlaylistTracks').mockResolvedValue({
      body: {
        items: [
          {
            track: {
              name: 'Song 1',
              artists: [{ name: 'Artist 1' }],
              external_urls: { spotify: 'https://spotify.com/song1' },
            },
          },
          {
            track: {
              name: 'Song 2',
              artists: [{ name: 'Artist 2' }],
              external_urls: { spotify: 'https://spotify.com/song2' },
            },
          },
        ],
      },
    });

    const res = await request(app)
      .post('/beer')
      .send({ temperature: 5 })
      .expect(200);

    expect(res.body.beerStyle).toBe('Pilsen');
    expect(res.body.playlist.name).toBe('Pilsen Playlist');
    expect(res.body.playlist.tracks).toEqual([
      {
        name: 'Song 1',
        artist: 'Artist 1',
        link: 'https://spotify.com/song1',
      },
      {
        name: 'Song 2',
        artist: 'Artist 2',
        link: 'https://spotify.com/song2',
      },
    ]);

    expect(mockSearchPlaylists).toHaveBeenCalledWith('Pilsen');
    expect(mockGetPlaylistTracks).toHaveBeenCalledWith('1');
  });

  test('should return 404 if playlist is not found', async () => {
    jest.spyOn(spotifyApi, 'searchPlaylists').mockResolvedValue({
      body: {
        playlists: {
          items: [],
        },
      },
    });

    const res = await request(app)
      .post('/beer')
      .send({ temperature: 20 })
      .expect(404);

    expect(res.body.message).toBe('Playlist not found.');
  });
});
