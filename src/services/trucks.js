import shortid from 'shortid';
import db from './db';
import utils from './utils';

const trucks = {
  async search(q, page = 1, sort = {}) {
    await utils.delay(500);
    return db.get('trucks').chunk(10).value()[page-1];
  },
  get(id) {
    await utils.delay(500);
    return db.get('trucks').find((t) => t.id === id).value();
  },
  update(id, truck) {
    await utils.delay(500);
    truck = { ...truck, id };
    db.get('trucks').find((t) => t.id === id).assign(truck).write();
    return truck;
  },
  create(truck) {
    await utils.delay(500);
    truck = { ...truck, id: shortid() };
    db.get('trucks').push(truck).write();
    return truck;
  },
  delete(id) {
    await utils.delay(500);
    db.get('trucks').remove({ id }).write();
    return;
  }
};

export default trucks;