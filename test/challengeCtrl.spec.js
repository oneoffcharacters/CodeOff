import { expect } from 'chai';
import Challenge from '../src/db/models/Challenge';

import challengeCtrl from '../src/db/controllers/challengeCtrl';

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
      challengeCtrl.findChallenge(id)
        .then((resp) => {
          expect(id).to.eql(resp.id);          
        })
    });
  });
});