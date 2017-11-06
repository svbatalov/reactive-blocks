import { transaction } from 'mobx';
import { types, onSnapshot, onPatch, unprotect } from 'mobx-state-tree';
import { generate } from 'shortid';
import { normalize, denormalize, schema } from 'normalizr';

import * as MST from 'mobx-state-tree';

export const Box = types.model("Box", {
  id: types.optional(types.identifier(types.string), generate),
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  next: types.maybe(types.late(() => Box)),
  inputs: types.maybe(types.late(() => types.array(Box))),
})
.actions(self => ({
  last: ()  => {
    let b = self;
    while(b.next) b = b.next;
    return b;
  },
  append: (b) => {
    self.last().next = b;
  }
}));

export const BoxList = types.model("BoxList", {
  id: types.optional(types.identifier(types.string), generate),
  boxes: types.array(Box),
})
.actions(self => ({
  add: box => self.boxes.push(box),
}))

export const box = Box.create({
  x: 10, y: 10,
  width: 150, height: 50,
  next: Box.create(),
})
export const boxList = BoxList.create({ boxes: [ box ]});

unprotect(boxList);

onSnapshot(boxList, snap => console.log("LOG", snap));
onPatch(boxList, patch => console.log("PATCH", patch));

const boxSchema = new schema.Entity('Box');
boxSchema.define({ next: boxSchema, });
const boxListSchema = new schema.Entity('BoxList', { boxes: [ boxSchema ] });

export const norm = (data) => {
  return normalize(data, boxListSchema);
};
export const denorm = (data) => {
  return denormalize(data.result, boxListSchema, data.entities);
};

window.store = module.exports;
window.onSnapshot = onSnapshot;
window.onPatch = onPatch;
window.transaction = transaction;
window.MST = MST;
