# callbag-iterate

A callbag puller sink which iterates through data from a pullable source. Think of it as a forEach loop for pullables.

`npm install callbag-iterate`

## example

```js
const fromIter = require('callbag-from-iter');
const iterate = require('callbag-iterate');

const source = fromIter([10,20,30,40])

source(0, iterate(x => console.log(x))); // 10
                                         // 20
                                         // 30
                                         // 40
```
