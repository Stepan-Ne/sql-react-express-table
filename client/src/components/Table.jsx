import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import TableRow from './TableRow';
import s from './Figma.module.css';

function Table() {
  // State
  const [state, setState] = useState();
  const [dates, setDates] = useState({
    dateReg: '',
    dateLastActiv: '',
  });
  const [calcValue, setCalcValue] = useState('');
  const [loading, setLoading] = useState(false);

  // fetch data
  const fetchData = () => {
    setLoading(true);
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty('table')) {
          setState(data.table);
        }
        if (data.hasOwnProperty('message')) {
          alert(data.message);
        }

        setCalcValue('');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Save
  const onSaveHandler = () => {
    if (dates.dateReg.trim() && dates.dateLastActiv.trim()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dates),
      };
      fetch('/api/user', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.hasOwnProperty('result')) {
            fetchData();
          }
          if (data.hasOwnProperty('message')) {
            alert(data.message);
          }
        });
      setDates({
        dateReg: '',
        dateLastActiv: '',
      });
    }
  };
  // set Date
  const onSetDate = (e) => {
    setDates((prev) => ({
      ...prev,
      ...{
        [e.target.name]: e.target.value,
      },
    }));
  };
  // Calculate
  const calculate = () => {
    fetch('/api/user/calc')
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty('calc')) {
          setCalcValue(data.calc);
        }
        if (data.hasOwnProperty('message')) {
          alert(data.message);
        }
      });
  };

  return (
    <>
      {loading ? <Loading /> : null}

      <table>
        <tbody>
          <tr>
            <th>UserID</th>
            <th>Date Registration</th>
            <th>Date Last Activity</th>
          </tr>
          {state
            ? state.map((row) => (
                <TableRow
                  fetchData={fetchData}
                  key={row.id}
                  id={row.id}
                  dateReg={row.datereg}
                  dateLastActiv={row.datelastactiv}
                />
              ))
            : null}
          <tr>
            <td>
              <button
                onClick={onSaveHandler}
                className={
                  dates.dateReg && dates.dateLastActiv ? '' : s.disableBtn
                }
                disabled={dates.dateReg && dates.dateLastActiv ? false : true}
              >
                {' '}
                Save
              </button>
            </td>
            <td>
              <input
                type='date'
                name='dateReg'
                value={dates.dateReg ? dates.dateReg : ''}
                onChange={onSetDate}
              />
            </td>
            <td>
              <input
                type='date'
                name='dateLastActiv'
                value={dates.dateLastActiv ? dates.dateLastActiv : ''}
                onChange={onSetDate}
              />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <b>
                Rolling Retention 7 day is{' '}
                {calcValue ? calcValue + ' %' : '...'}
              </b>
            </td>

            <td>
              <button onClick={calculate}> Calculate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Table;
