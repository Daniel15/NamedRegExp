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
	
	describe('replace', function () {
		it('should function as a static method', function () {
			var regexp = new NamedRegExp('^(?P<helloworld>\\d+)$');
			var input = '12345';
			var replacement = 'aaa \\k<helloworld> bbb';
			var expected = 'aaa 12345 bbb';
			
			var result = NamedRegExp.replace(input, regexp, replacement);
			expect(result).toBe(expected);
		});
		
		it('should function as a String method', function () {
			var regexp = new NamedRegExp('^(?P<helloworld>\\d+)$');
			var input = '12345';
			var replacement = 'aaa \\k<helloworld> bbb';
			var expected = 'aaa 12345 bbb';
			
			var result = input.replace(regexp, replacement);
			expect(result).toBe(expected);
		});
		
		it('should support replacing two groups', function () {
			var regexp = new NamedRegExp('^(?P<year>\\d+) is (?P<msg>.+)$');
			var input = '2012 is awesome';
			var replacement = 'It\'s \\k<msg> in \\k<year>!';
			var expected = 'It\'s awesome in 2012!';
			
			var result = NamedRegExp.replace(input, regexp, replacement);
			expect(result).toBe(expected);
		});
	})
});
