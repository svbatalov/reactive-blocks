import React from 'react';
import * as store from '../store';
import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';

import styles from './App.scss';
import BoxView from './BoxView';

@observer
export default class App extends React.Component {
  render () {
    const bl = getSnapshot(store.boxList);
    const nbl = store.norm(bl);
    const dnbl = store.denorm(nbl);
    return (
      <div>
        <svg width={600} height={300} className={styles.drawing}>
          {
            store.boxList.boxes.map(b => <BoxView box={b} key={b.toString()} />)
          }
        </svg>

        <ul>
          <li>
            ORIGINAL
            {JSON.stringify(bl)}
          </li>
          <li>
            NORM
            {JSON.stringify(nbl)}
          </li>
          <li>
            DENORM
            {JSON.stringify(dnbl)}
          </li>
        </ul>

      </div>
    );
  }
}
