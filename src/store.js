import { types, onSnapshot } from 'mobx-state-tree';

export const Box = types.model("Box", {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
});

export const BoxList = types.model("BoxList", {
  boxes: types.array(Box),
})
