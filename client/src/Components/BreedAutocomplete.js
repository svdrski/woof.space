import React from 'react';
import Select from 'react-select';
import '../Pages/Css/Auth.css'

export const dogBreedsOptions = [
    { value: 'Beagle', label: 'Beagle' },
    { value: 'Boxer', label: 'Boxer' },
    { value: 'Bulldog', label: 'Bulldog' },
    { value: 'Chihuahua', label: 'Chihuahua' },
    { value: 'Dachshund', label: 'Dachshund' },
    { value: 'Doberman Pinscher', label: 'Doberman Pinscher' },
    { value: 'French Bulldog', label: 'French Bulldog' },
    { value: 'German Shepherd', label: 'German Shepherd' },
    { value: 'Golden Retriever', label: 'Golden Retriever' },
    { value: 'Great Dane', label: 'Great Dane' },
    { value: 'Labrador Retriever', label: 'Labrador Retriever' },
    { value: 'Poodle', label: 'Poodle' },
    { value: 'Pug', label: 'Pug' },
    { value: 'Rottweiler', label: 'Rottweiler' },
    { value: 'Shetland Sheepdog', label: 'Shetland Sheepdog' },
    { value: 'Shih Tzu', label: 'Shih Tzu' },
    { value: 'Siberian Husky', label: 'Siberian Husky' },
    { value: 'Yorkshire Terrier', label: 'Yorkshire Terrier' }
  ];

const AutoCompleteBreed = ({setFormData, formData}) => {


  const handleChange = (selectedOption) => {
    setFormData({ ...formData, breed: selectedOption.value, });
  };

  return (
    <>
      <label htmlFor="autocomplete">Choose Breed:</label>
      <Select
        id="autocomplete"
        name='breed'
        options={dogBreedsOptions}
        onChange={handleChange}
        placeholder={'search' }
      />
    </>
  );
};


export default AutoCompleteBreed;