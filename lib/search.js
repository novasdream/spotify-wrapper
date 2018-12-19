'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = search;

var _config = require('./config');

var _utils = require('./utils');

function searcher(type, query) {
  return this.request(this.apiURL + '/search?q=' + query + '&type=' + type);
}

function search() {
  return {
    artists: searcher.bind(this, 'artist'),
    albums: searcher.bind(this, 'album'),
    tracks: searcher.bind(this, 'track'),
    playlists: searcher.bind(this, 'playlist')
  };
}