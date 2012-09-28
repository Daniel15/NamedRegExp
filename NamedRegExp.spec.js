describe('NamedRegExp', function () {
	it('should return RegExp objects', function () {
		var regexp = new NamedRegExp('\\d+');
		expect(regexp instanceof RegExp).toBe(true);
	});
	
	it('should support standard named groups', function () {
		var regexp = new NamedRegExp('^(?P<helloworld>\\d+)$');
		var input = '12345';
		
		var result = regexp.exec(input);
		expect(result).toBeTruthy();
		expect(result.helloworld).toBe('12345');
		expect(result[1]).toBe('12345');
	});
	
	it('should support two groups', function () {
		var regexp = new NamedRegExp('Hello (?P<name>\\w+?) from (?P<year>20[1-9][0-9])');
		var input = 'Hello Daniel from 2012';
		
		var result = regexp.exec(input);
		expect(result).toBeTruthy();
		expect(result.name).toBe('Daniel');
		expect(result.year).toBe('2012');
	});
});