import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import 'mocha';
import { search, searchAlbums, searchArtists, searchTracks, searchPlayList } from '../src/search';

chai.use(sinonChai);

global.fetch = require('node-fetch');
/* eslint-disable no-unused-expressions */
/* eslint-disable padded-blocks */

describe('Search', () => {

  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke Test', () => {
    it('should existis method `search`', () => {
      expect(search).to.exist;
    });

    it('should existis method `searchAlbums`', () => {
      expect(searchAlbums).to.exist;
    });

    it('should existis method `searchArtists`', () => {
      expect(searchArtists).to.exist;
    });

    it('should existis method `searchTracks`', () => {
      expect(searchTracks).to.exist;
    });

    it('should existis method `searchPlayList`', () => {
      expect(searchPlayList).to.exist;
    });
  });

  describe('generic search', () => {
    

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive correct url to search', () => {

      context('passig one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passig more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      const artists = search('Incubus', 'artist');
    });
  });

  describe('searchArtist', () => {

    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

  });

  describe('searchAlbum', () => {

    it('should call fetch function', () => {
      const artists = searchAlbums('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchAlbums('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      const artists2 = searchAlbums('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

  });


  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const artists = searchTracks('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchTracks('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
      const artists2 = searchTracks('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

  });




  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const artists = searchPlayList('Incubus');
      expect(fetchedStub).to.be.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchPlayList('Incubus');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
      const artists2 = searchPlayList('Muse');
      expect(fetchedStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

  });

});
