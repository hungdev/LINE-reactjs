import shortid from 'shortid';
import db from './db';
import utils from './utils';

const trucks = {
  async search(q, page = 1) {
    await utils.delay(500);
    const paged = db.get('trucks').chunk(10).value();
    if (page < 1 || page > paged.length) {
      throw new Error('No items found');
    }

    return {
      items: paged[page - 1],
      count: db.get('trucks').value().length,
      page,
      maxPage: paged.length,
    };
  },
  async get(id) {
    await utils.delay(500);
    const truck = db.get('trucks').find(t => t.id === id).value();
    if (!truck) {
      throw new Error(`Truck with ID ${id} not found`);
    }

    return truck;
  },
  async update(id, truck) {
    await utils.delay(500);
    const newTruck = { ...truck, id };
    db.get('trucks').find(t => t.id === id).assign(newTruck).write();
    return newTruck;
  },
  async create(truck) {
    await utils.delay(500);
    const newTruck = { ...truck, id: shortid() };
    db.get('trucks').push(newTruck).write();
    return newTruck;
  },
  async delete(id) {
    await utils.delay(500);
    db.get('trucks').remove({ id }).write();
  },
};

export default trucks;
