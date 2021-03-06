var expect = require('chai').expect;
var rewire = require('rewire');

describe('MusicServices', function () {

  var musicServices;

  beforeEach(() => {

    musicServices = rewire('../../lib/musicservices');

  });

  it('should reject on non existent service', () => {
    return musicServices.tryGetHighResArt('sid=1000')
      .then(() => {
        throw new Error('Should not resolve');
      }, () => {
        console.log('Rejected succesfully');
      });
  });

  it('should return cover art on existing service', () => {
    return musicServices.tryGetHighResArt('x-sonos-http:track%3a44731098.mp3?sid=160&flags=8224&sn=10')
    .then((url) => {
      expect(url).to.equal('https://i1.sndcdn.com/artworks-000022486019-txiq8s-t500x500.jpg');
    });
  });
});