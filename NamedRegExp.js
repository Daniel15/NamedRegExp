/** @preserve
 * NamedRegExp, by Daniel15, 2012
 * Adds named capturing groups to JavaScript's regular expressions.
 * http://github.com/Daniel15/NamedRegExp
 */
;window.NamedRegExp = (function () {
	'use strict';
	
	var 
		// Native RegExp object prototype
		nativeRegex = RegExp.prototype,
		nativeExec = nativeRegex.exec,
		
		nativeString = String.prototype,
		nativeReplace = nativeString.replace,
		// Named group - Matches (?P<name>....)
		group = /\(\?P<([^>]+)>/g,
		// Backreference - Matches \k<name>
		backref = /\\k<([^>]+)>/g;
	
	// Exec function that takes named groups into account
	var exec = function (string) {
		// Perform native regex match
		var result = nativeExec.call(this, string);
		
		// Ensure result isn't null
		if (!result)
			return result;
			
		// Add the named groups
		for (var i = 0, count = this.namedGroups.length; i < count; i++) {
			result[this.namedGroups[i]] = result[i + 1];
		}
		
		return result;
	};
	
	// Constructor for NamedRegExp
	var NamedRegExp = function NamedRegExp (pattern, flags) {	
		var groups = [],
			groupIndices = {};
		
		// Go through all named groups
		var newPattern = pattern.replace(group, function (match, name, offset, string) {
			// Array#push returns the array length, which is the same as the regex replacement index.
			groupIndices[name] = groups.push(name);
			return '(';
		});
		
		// Actually inheriting from RegExp doesn't work in most browsers ("TypeError: Method RegExp.prototype.test called on incompatible receiver")
		// So we create a standard regular expression and override some of its methods.
		// Create native regexp
		var regexp = new RegExp(newPattern, flags);
		// Properties
		regexp.isNamed = true;
		regexp.namedGroups = groups;
		regexp.namedGroupIndices = groupIndices;
		regexp.originalSource = pattern;
		
		// Methods
		regexp.exec = exec;
		
		return regexp;
	}

	/**
	 * Returns a new string with some or all matches of a `pattern`` replaced by a `replacement`. 
	 * @param   {String}           string       Input string to search for replacements in
	 * @param   {RegExp|String}    pattern      Pattern to replace
	 * @param   {String|Function}  replacement  What to replace `pattern` with
	 * @return  {String}           A new string with all the patterns replaced
	 */
	NamedRegExp.replace = function replace(string, pattern, replacement) {
		if (typeof(replacement) !== 'function') {
			// Switch the named backreferences with their index
			var replacement = replacement.replace(backref, function (match, name) {
				return '$' + pattern.namedGroupIndices[name];
			});
		}
	
		return string.replace(pattern, replacement);
	}
	
	return NamedRegExp;
})();
