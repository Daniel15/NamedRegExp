NamedRegExp
===========

This is a very simple and tiny JavaScript library to add support for [named capturing groups](http://www.regular-expressions.info/named.html)
to JavaScript's RegExp object.  It does this by exposing a new class called `NamedRegExp` that 
inherits functionality from the native RegExp object and adds additional functionality.

For more advanced functionality, consider using [XRegExp](http://xregexp.com/).

Usage
=====

```javascript
var regexp = new NamedRegExp('Hello (?P<name>\\w+) from (?P<year>20[1-9][0-9])');
var results = regexp.exec('Hello Daniel from 2012');
alert(results.name) // "Daniel"
alert(results.year) // "2012"
```

Licence
=======
(The MIT licence)

Copyright (C) 2012 Daniel Lo Nigro (Daniel15)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.