var expect = require('chai').expect;
var mongojs = require('mongojs');
var db = mongojs('project',['hotel']);

var value;
describe('TestMongoDB',function(){

	before(function (done){
        db.hotel.aggregate([{$match:{city:"Delhi",hotel_category:"regular",area:"Kalkaji",property_type:"Hotel"}},
        {$sort:{hotel_star_rating:-1}}],
        function (err,res){ 
			value=res[0].property_name;
            done();
        });
    });
    it('Value by city, area and category',function(){
		const result = value;
		expect(result).to.equal("Sunrise Villa");
	});
});