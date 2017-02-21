import React from 'react';

const TableIndexItem = ({ table, deleteTable, updateEditState }) => {
  return (
    <div className="table-index-item">
      <h1>{ table.name }</h1>
      <p><strong>Number of horses:</strong> { table.min_seats} to { table.max_seats }</p>
      <div className="table-index-links">
        <button onClick={ () => updateEditState(table) }>Edit</button>
        <button onClick={ () => deleteTable(table) }>Delete</button>
      </div>
    </div>
  );
};

export default TableIndexItem;
