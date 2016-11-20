import { expect } from 'chai';
import Challenge from '../src/db/models/Challenge';
import promise from 'bluebird';

import challengeCtrl from '../src/db/controllers/challenge';

describe('challenge controller', () => {
  var id;
  describe('findChallenge' , () => {
    beforeEach((done) => {
      Challenge.create({}, (err, item) => {
        id = item._id;
        done();
      })
    })

    it('should successfully retreive from Challenge collection', () => {
      console.log('IT ID ', id);
      challengeCtrl.findChallenge(id)
        .then(resp => {
          expect(id).to.eql(resp.id);          
        })
    })
  });
});
