import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'mocha';
import { search, searchAlbums, searchArtists, searchTracks, searchPlayList } from '../src/search';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');
/* eslint-disable no-unused-expressions */
/* eslint-disable padded-blocks */

describe('Search', () => {

  let fetchedStub;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke Test', () => {
    it('should existis method `search`', () => {
      expect(spotify).to.exist;
    });

    it('should existis method `searchAlbums`', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should existis method `searchArtists`', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should existis method `searchTracks`', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should existis method `searchPlayList`', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('searchArtist', () => {

    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists =  spotify.search.artists('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
      const artists2 =  spotify.search.artists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

  });

  describe('searchAlbum', () => {

    it('should call fetch function', () => {
      const artists =  spotify.search.albums('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.albums('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      const artists2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

  });


  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const artists = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
      const artists2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

  });


  describe('searchPlaylist', () => {

    it('should call fetch function', () => {
      const artists = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
      const artists2 = spotify.search.playlists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

  });

});
