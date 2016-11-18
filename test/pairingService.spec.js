// import request from 'supertest';
// import chai from 'chai';
// import mocha from 'mocha'
// import Chance from 'chance';

// const chance = new Chance();
// const should = chai.should();


// // var should = require('should');
// var io = require('socket.io-client')
// // var io = require('../node_modules/socket.io-client');

// var socketURL = 'http://localhost:3000';
// var socketURLshort = 'localhost:3000';
// var options ={
// 	transports: ['websocket'],
// 	'forceNew': true
// };

// describe("Pairing Service",function(){

// 	it('Should return pair information on being paired', function(done){
// 		var client1 = io.connect(socketURL, options);

// 		var clientID1 = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
// 		var clientID2 = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
// 		console.log('The test started for sockets')
		
// 		//=====debugging start=====//
// 		client1.on('connect_error',  data => {
// 			console.log('error in connecting',  data)
// 		})
// 		client1.on('connect_timeout',  data => {
// 			console.log('error in connect_timeout',  data)
// 		})

// 		var testC = io.connect(socketURLshort, options)
// 		client1.on('connect',  function(connectMessage1) {
// 			console.log('The short test client worked!')
// 		})

// 		// io.on('connect', data => {
// 		// 	console.log('The big connection has recieved',  data)
// 		// })
// 		//=====debugging end=====//

// 		client1.on('connect',  function(connectMessage1) {

// 			console.log('Client 1 connected');
// 			client1.on(clientID1, function(data){
// 				console.log('client 2 has been paired', data);
// 			});
// 			//Simulate first client requesting a pair
// 			client1.emit('message', {
// 				clientID: clientID1
// 			});

// 			var client2 = io.connect(socketURL, options);
// 			client2.on('connect',  function(connectMessage) {

// 				console.log('Client 2 connected');
// 				client2.on(clientID2, function(data){
// 					console.log('client 2 has been paired', data);
// 					//Close the connections
// 					client1.disconnect();
// 					client2.disconnect();
// 					done();
// 				})
// 				//Simulate second client requesting a pair
// 				client2.emit('message', {
// 					clientID: clientID2
// 				});
// 			})
// 		});

// 		})
// });
