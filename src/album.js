import API_URL from './config';
import { toJSON } from './utils';

export const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`)
    .then(toJSON);

export const getAlbums = arr =>
  fetch(`${API_URL}/albums/${arr}`)
    .then(toJSON);

export const getAlbumTracks = id =>
  fetch(`${API_URL}/albums/${id}/tracks`)
    .then(toJSON);
