import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class BoxView extends React.Component {
  render () {
    const b = this.props.box;
    const { x, y, width, height, next } = b;
    const nextConnectorX = x + 10;
    const nextConnectorY = y + height;
    return (
      <g>
        <rect {...{x, y, width, height}} />
        <circle cx={nextConnectorX} cy={nextConnectorY} r={3} />
        <g transform={`translate(${x} ${nextConnectorY})`} >
          { next && <BoxView box={next} /> }
        </g>
      </g>
    );
  }
}
