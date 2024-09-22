import React, { useContext, useReducer, useState, useEffect } from 'react';
import '../Styles/Booking.css';
import { Helmet } from 'react-helmet';
import { IoIosSwap } from "react-icons/io";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { MdFlightTakeoff } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FormContext } from './FormContext';

let today = new Date();

let initialState = { ecocount: 0, bizcount: 0, firstcount: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementEco':
      return { ...state, ecocount: state.ecocount + 1 };
    case 'decrementEco':
      if (state.ecocount > 0) {
        return { ...state, ecocount: state.ecocount - 1 };
      }
      return state;
    case 'incrementBiz':
      return { ...state, bizcount: state.bizcount + 1 };
    case 'decrementBiz':
      if (state.bizcount > 0) {
        return { ...state, bizcount: state.bizcount - 1 };
      }
      return state;
    case 'incrementFirst':
      return { ...state, firstcount: state.firstcount + 1 };
    case 'decrementFirst':
      if (state.firstcount > 0) {
        return { ...state, firstcount: state.firstcount - 1 };
      }
      return state;
    default:
      return state;
  }
};

function Booking() {

  const [formData, setFormData] = useContext(FormContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [valFrom, setValFrom] = useState('');
  const [valTo, setValTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/airport')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOptions(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => console.error('Error fetching options:', error));
  }, []);

  useEffect(() => {
    if (
      formData.ecocount !== state.ecocount ||
      formData.bizcount !== state.bizcount ||
      formData.firstcount !== state.firstcount
    ) {
      setFormData({
        ...formData,
        ecocount: state.ecocount,
        bizcount: state.bizcount,
        firstcount: state.firstcount,
      });
    }
  }, [state, formData, setFormData]);
  

  const swapValues = () => {
    const temp = valFrom;
    setValFrom(valTo);
    setValTo(temp);
  };

  const handleChangeFrom = (e) => {
    setValFrom(e.target.value);
    setFormData({
      ...formData,
      from: e.target.value
    });
  };
  
  const handleChangeTo = (e) => {
    setValTo(e.target.value);
    setFormData({
      ...formData,
      to: e.target.value
    });
  };

  const DateTransferDep = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      dateFrom: date
    });
  };

  let dateFormat = 'dd-MM-yyyy';

  const handlePassengerCountChange = (type, isIncrement) => {
    if (isIncrement) {
      dispatch({ type: `increment${type}` });
    } else {
      dispatch({ type: `decrement${type}` });
    }
  };

  return (
    <div className='book'>
      <Helmet>
        <title>Book your tickets</title>
      </Helmet>
      <div className='box'>
        <div className='date'>
          <form>
            <h3><b className='flight-status'>Flight Trip <MdFlightTakeoff /></b></h3>
            <div className='input-container'>
              <div className='frombox'>
                <input
                  type='text'
                  value={valFrom}
                  list='airports'
                  onChange={handleChangeFrom}
                  placeholder='Departure Airport'
                  className='Finput'
                />
                <datalist id='airports'>
                  {options.map((option, index) => (
                    <option key={index} value={option.airport} />
                  ))}
                </datalist>
              </div>
              <button className='arrow-img' type="button" onClick={swapValues}>
                <IoIosSwap className='icon' />
              </button>
              <div className='tobox'>
                <input
                  type='text'
                  value={valTo}
                  list='airports'
                  onChange={handleChangeTo}
                  placeholder='Arrival Airport'
                  className='Tinput'
                />
                <datalist id='airports'>
                  {options.map((option, index) => (
                    <option key={index} value={option.airport} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className='Dtime'>
              <label htmlFor='date'>Departure Date:</label>
              <DatePicker
                selected={selectedDate}
                className='date-select'
                dateFormat={dateFormat}
                onChange={DateTransferDep}
                minDate={today}
              />
            </div>
            <div className='pax-count'>
              <div className='eco'>
                <p className='head1'>Economy Class</p>
                <div className='eco-count'>
                  <button type='button' onClick={() => handlePassengerCountChange('Eco', false)}>-</button>
                  <p>{state.ecocount}</p>
                  <button type='button' onClick={() => handlePassengerCountChange('Eco', true)}>+</button>
                </div>
              </div>
              <div className='biz'>
                <p className='head2'>Business Class</p>
                <div className='biz-count'>
                  <button type='button' onClick={() => handlePassengerCountChange('Biz', false)}>-</button>
                  <p>{state.bizcount}</p>
                  <button type='button' onClick={() => handlePassengerCountChange('Biz', true)}>+</button>
                </div>
              </div>
              <div className='firstclass'>
                <p className='head3'>First Class</p>
                <div className='first-count'>
                  <button type='button' onClick={() => handlePassengerCountChange('First', false)}>-</button>
                  <p>{state.firstcount}</p>
                  <button type='button' onClick={() => handlePassengerCountChange('First', true)}>+</button>
                </div>
              </div>
            </div>
            <Link to='/FlightFind'>Search Flights</Link>
          </form>
        </div>
        <b className='note'>*Note: This is a hub and spoke airline, so passengers not flying to or from Zurich must book two tickets via Zurich International Airport to their final destination airport.</b>
      </div>
    </div>
  );
}

export default Booking;
