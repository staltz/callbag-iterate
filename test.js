const test = require('tape');
const iterate = require('./index');

test('it sends DATA upwards until END is sent downwards', (t) => {
  t.plan(12);
  const upwardsExpected = [[1, undefined], [1, undefined], [1, undefined]];
  const downwardsExpected = ['a', 'b', 'c'];

  const sink = iterate(x => {
    t.equals(x, downwardsExpected.shift(), 'downwards data is expected');
  });
  let sent = 0; 
  const source = (type, data) => {
    if (type === 0) {
      data(0, source);
      return;
    }
    if (sent === 3) {
      sink(2);
      return;
    }
    t.true(upwardsExpected.length > 0, 'source can be pulled');
    const expected = upwardsExpected.shift();
    t.equals(type, expected[0], 'upwards type is expected');
    t.equals(data, expected[1], 'upwards data is expected');
    if (sent === 0) {
      sent++;
      sink(1, 'a');
    }
    if (sent === 1) {
      sent++;
      sink(1, 'b');
    }
    if (sent === 2) {
      sent++;
      sink(1, 'c');
    }
  };

  source(0, sink);
});
