import { expect } from 'chai';
import sinon from 'sinon';
import SpotifyWrapper from '../src/index';

/* eslint-disable no-unused-expressions */
/* eslint-disable padded-blocks */

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blablabla',
    });
    expect(spotify.apiURL).to.be.eql('blablabla');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.eql('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.eql('foo');
  });

  describe('request method', () => {
    let stubedFetch;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      stubedFetch.resolves({ json: () => ({ album: 'name' }) });
    });
  
    afterEach(() => {
      stubedFetch.restore();
    });
    
    it('should have request method ', () => {
      const spotify = new SpotifyWrapper({});

      expect(spotify.request).to.exist;
    });

    it('should call fetch when request.', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with right url passed.', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      const headers = {
        headers: {
          Authorization: 'Bearer foo',
        },
      };
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});

