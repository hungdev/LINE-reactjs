import test from 'ava';
import utils from '../../src/services/utils';

test('delay 50ms', async t => {
  const begin = Date.now();
  await utils.delay(50);
  const passed = Date.now() - begin;
  t.true(passed >= 50);
  t.true(passed <= 60);
});

test('delay 100ms', async t => {
  const begin = Date.now();
  await utils.delay(100);
  const passed = Date.now() - begin;
  t.true(passed >= 100);
  t.true(passed <= 110);
});
