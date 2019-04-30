import test from 'ava';
import truckService from '../../src/services/trucks';

test('search', async t => {
  const resp = await truckService.search();
  t.is(resp.count, 100);
  t.is(resp.items.length, 10);
  t.is(resp.items[0].id, 'tlUVSavkr');
  t.is(resp.items[0].plate, '30T-64797');
});

test('get', async t => {
  const truck = await truckService.get('f6Vi7nAgqg');
  t.is(truck.plate, '30T-34017');
});

test('update', async t => {
  const truck = await truckService.update('hpVBCspJXd', { plate: '35K-17461' });
  t.is(truck.plate, '35K-17461');
});

test('delete', async t => {
  await truckService.delete('63ouRng9cp');
  await t.throwsAsync(truckService.get('63ouRng9cp'), 'Truck with ID 63ouRng9cp not found');
});
