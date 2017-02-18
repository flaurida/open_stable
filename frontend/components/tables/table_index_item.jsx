import React from 'react';

const TableIndexItem = ({ table }) => {
  return (
    <div className="table-index-item">
      <h1>{ table.name }</h1>
      <p>Number of horses: { table.min_seats} to { table.max_seats }</p>
      <p>Reservation duration: { table.dining_time / 60 } hours</p>
    </div>
  );
};

export default TableIndexItem;
