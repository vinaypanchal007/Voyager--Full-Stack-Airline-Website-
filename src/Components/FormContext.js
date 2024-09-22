import React, { createContext, useState } from 'react';

export const FormContext = createContext();

const initialData = {
  from: '',
  to: '',
  dateFrom: '',
  depTime: '',
  ecocount: 0,
  bizcount: 0,
  firstcount: 0,
  name: '',
  email: '',
  phone: '',
  voyagerPlus: false,
  selectedSeats: [],
  totalPrice: 0
};


export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialData);

  return (
    <FormContext.Provider value={[formData, setFormData]}>
      {children}
    </FormContext.Provider>
  );
};
