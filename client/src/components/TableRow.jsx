import React from 'react';
import moment from 'moment';

function TableRow({ id, dateReg, dateLastActiv, fetchData }) {
 
  const delUser = (id) => {
    fetch(`/api/user/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty('result')) {
          fetchData();
        }
        if (data.hasOwnProperty('message')) {
alert(data.message)
        }
      });
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{moment(dateReg).format('DD-MM-YYYY')}</td>
      <td>
        {moment(dateLastActiv).format('DD-MM-YYYY')}
        &nbsp;&nbsp;&nbsp;
        <button onClick={() => delUser(id)}> x </button>
      </td>
    </tr>
  );
}

export default TableRow;
