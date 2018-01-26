const test = require('tape');
const iterate = require('./index');

test('it sends DATA upwards until END is sent downwards', (t) => {
  t.plan(12);
  const upwardsExpected = [[1, undefined], [1, undefined], [1, undefined]];
  const downwardsExpected = ['a', 'b', 'c'];

  const sink = iterate(x => {
    t.equals(x, downwardsExpected.shift(), 'downwards data is expected');
  });

  function makeSource() {
    let sent = 0; 
    let sinkRef;
    return function source(type, data) {
      if (type === 0) {
        sinkRef = data;
        sinkRef(0, source);
        return;
      }
      if (sent === 3) {
        sinkRef(2);
        return;
      }
      t.true(upwardsExpected.length > 0, 'source can be pulled');
      const expected = upwardsExpected.shift();
      t.equals(type, expected[0], 'upwards type is expected');
      t.equals(data, expected[1], 'upwards data is expected');
      if (sent === 0) {
        sent++;
        sinkRef(1, 'a');
        return;
      }
      if (sent === 1) {
        sent++;
        sinkRef(1, 'b');
        return;
      }
      if (sent === 2) {
        sent++;
        sinkRef(1, 'c');
        return;
      }
    };
  }

  const source = makeSource();
  sink(source);
});
