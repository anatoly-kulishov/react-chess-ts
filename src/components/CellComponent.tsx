import React, { FC } from 'react';
import classNames from 'classnames';

// Models
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={classNames('cell', cell.color, {
        selected,
      })}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? 'green' : '' }}
    >
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};
