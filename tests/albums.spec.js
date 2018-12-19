import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
// getAlbumTracks

/* eslint-disable no-unused-expressions */
/* eslint-disable padded-blocks */

describe('Album', () => {
  let stubedFetch;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke test', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const album = spotify.album.getAlbum('4ffXByMAjLpd25ZyzEJNMK');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4ffXByMAjLpd25ZyzEJNMK');

      const album2 = spotify.album.getAlbum('4ffXByMAjLpd25ZyzEJNMx');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4ffXByMAjLpd25ZyzEJNMx');
    });

    it('should return the correct data from Promise', () => {
      const album = spotify.album.getAlbum('4ffXByMAjLpd25ZyzEJNMK');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const album = spotify.album.getAlbums(['4ffXByMAjLpd25ZyzEJNMK', '12Chz98pHFMPJEknJQMWvI']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/ids=4ffXByMAjLpd25ZyzEJNMK,12Chz98pHFMPJEknJQMWvI');
    });

    it('should return the correct data from Promise', () => {
      const album = spotify.album.getAlbum(['4ffXByMAjLpd25ZyzEJNMK', '12Chz98pHFMPJEknJQMWvI']);
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const album = spotify.album.getTracks('4ffXByMAjLpd25ZyzEJNMK');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4ffXByMAjLpd25ZyzEJNMK/tracks');
    });

    it('should return the correct data from Promise', () => {
      const album = spotify.album.getTracks('4ffXByMAjLpd25ZyzEJNMK');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
