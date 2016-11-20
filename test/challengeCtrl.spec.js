import { expect } from 'chai';
import Challenge from '../src/db/models/Challenge';
import promise from 'bluebird';

import challengeCtrl from '../src/db/controllers/challengeCtrl';

describe('challenge controller', () => {
  var id;
  describe('findChallenge' , () => {
    beforeEach((done) => {
      Challenge.create({}, (err, item) => {
        id = item._id;
        console.log('BEFORE ERROR ', err);
        console.log('BEFORE ID ', id);;
        done();
      })
    })

    it('should successfully retreive from Challenge collection', () => {
      console.log('IT ID ', id);
      challengeCtrl.findChallenge(id)
        .then(resp => {
          console.log('THEN ID ',resp.id);
          expect(id).to.eql(resp.id);          
        })
    })
  });
});