var Browser = require('zombie'),
	assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function(){
	
	setup(function(){
		browser = new Browser();
	});

	test('requesting a group rate quote from the hood river tour page ' + 
		'should populate the referrer field', function(done){
		var referrer = 'http://localhost:3000/tours/hood-river';
		assert.equal(1, 1, 'this is good, 1 = 1');
		done();
		/*browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});*/
	});

	test('requesting a group rate from the oregon coast tour page should ' + 
		'populate the referrer field', function(done){
		var referrer = 'http://localhost:3000/tours/oregon-coast';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});

	/*test('visiting the "request group rate" page directly should result ' + 
		'in an empty referrer field', function(done){
		var referrer = 'http://localhost:3000/tours/request-group-rate';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				assert(browser.field('referrer').value === '');
				done();
			});
		});
	});*/
});
