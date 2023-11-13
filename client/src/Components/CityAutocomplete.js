import React from 'react';
import Select from 'react-select';
import '../Pages/Css/Auth.css'

const israelCitiesOptions = [
    { value: 'jerusalem', label: 'Jerusalem' },
    { value: 'telaviv', label: 'Tel Aviv' },
    { value: 'haifa', label: 'Haifa' },
    { value: 'ashdod', label: 'Ashdod' },
    { value: 'beer-sheva', label: 'Beer Sheva' },
    { value: 'holon', label: 'Holon' },
    { value: 'petah-tikva', label: 'Petah Tikva' },
    { value: 'netanya', label: 'Netanya' },
    { value: 'ramat-gan', label: 'Ramat Gan' },
    { value: 'eilat', label: 'Eilat' },
    { value: 'nazareth', label: 'Nazareth' },
    { value: 'tiberias', label: 'Tiberias' },
    { value: 'beit-shean', label: 'Beit Shean' },
    { value: 'beit-shean', label: 'Bat Yam' },
    { value: 'Holon', label: 'Holon' },

  ];


const AutoCompleteField = ({setFormData, formData}) => {


  const handleChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption.label, });
    console.log(formData);
  };

  return (
    <>
      <label htmlFor="autocomplete">Choose City:</label>
      <Select
      className='citycomplete'
        id="autocomplete"
        name='city'
        options={israelCitiesOptions}
        onChange={handleChange}
        placeholder={formData.city}
      />
    </>
  );
};


export default AutoCompleteField;