var expect = require('chai').expect;
var mongojs = require('mongojs');
var db = mongojs('pro',['rest']);

var count = 0;
describe('TestMongoDB 8',function(){

	before(function (done){
   		db.rest.aggregate([{$match:{
					country:"US-zone-1"
				   }},{$project:{city:1,_id:0}},{$sort:{rating:-1}}
		       		   ],function(err,res){
                                        
				          count=res[1].city;
                                             done();
                                                     }
						

                                );




		});

	it('by country city name sort by rating descending',function(){
		const result = count;
		expect(result).to.equal("Louisville");
	});
});