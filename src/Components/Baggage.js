import React from 'react'
import '../Styles/Baggage.css'
import BaggageMain from '../Images/baggage.jpg'
import Bag1 from '../Images/baggage3.jpg'
import { Helmet } from 'react-helmet'

function Baggage() {
  return (
    <div>
      <Helmet>
        <title>Baggage</title>
      </Helmet>
      <div className='L'>
        <div className='pic'>
          <img src={BaggageMain} alt='baggage_main' className='baggageimg'/>
        </div>
        <div className='first_info'>
          <h4 className='mainhead'>Carry more what u love</h4>
          <p>When you fly with Voyager, you automatically enjoy up to 10kg* cabin baggage allowance - 3kg more than most carriers!
            The extra allowance lets you save money and time – pack more gifts for your loved ones and spend more time enjoying your travels instead of waiting in line for your checked baggage.
            Make sure that your cabin baggage does not exceed the permitted allowance before you get to the airport, or you will be advised to check in your baggage and may be subject to excess baggage fees.
            *Limited to 1 carry-on bag and 1 personal item, within permitted dimensions.
          </p>
        </div>
        <div className='divider'></div>
        <div className='side-by-side'>
          <div className='pic_two'>
            <img src={Bag1} alt='bag1' className='bag1'/>
          </div>
          <div className='box'>
            <h2 className='head_two'>Baggage Allowance for every Cabin class</h2>
            <table className='bag_table'>
              <thead>
                <tr className='t_one'>
                  <th className='hone'>Cabin Class</th>
                  <th className='htwo'>Voyager Standard (Luggage per person)</th>
                  <th className='hthree'>Voyager Plus (Luggage per person)</th>
                </tr>
              </thead>
              <tbody>
                <tr className='t_two'>
                  <td>Economy</td>
                  <td>10kg</td>
                  <td>15kg</td>
                </tr>
                <tr className='t_three'>
                  <td>Business</td>
                  <td>15kg</td>
                  <td>20kg</td>
                </tr>
                <tr className='t_four'>
                  <td>First</td>
                  <td>20kg</td>
                  <td>30kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>  
        <div className='second_info'>
          <p>Voyager Plus travelers are allowed up to two pieces of cabin baggage. Your carry-on luggage must fit within the dimensions of 46cm x 38cm x 23cm (total linear dimensions cannot exceed 115cm) to fit in the overhead compartment in the aircraft cabin and your personal item or bag must fit within the dimensions of 40cm x 30cm x 10cm to be stowed under the seat in front of you.
            Rest assured that even after stowing your bag under the seat in front of you, there will still be sufficient legroom for a comfortable journey on our flights.
            Pack within these cabin baggage limits for a smooth journey! By doing so, you’re helping to facilitate a seamless boarding experience when you stow your carry-on in the overhead compartment with ease, in turn, helping to make a better travel experience possible.
            Please note that infants will not have cabin baggage allowance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Baggage;
