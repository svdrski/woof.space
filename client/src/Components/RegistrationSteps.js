import AutoCompleteField from './CityAutocomplete'
import AutoCompleteBreed from "./BreedAutocomplete";

export default function RegistrationSteps ({step, formData, setFormData, func}){


    function changer(e){
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const {selectedFiles, handleFileChange} = func
      
    
    return(
    <>

                { step  === 1 ?  (
                        <>
                        <label htmlFor='name'>Your name</label>
                        <input className='inp' onChange={changer} value={formData.name} name='name' required/>

                        <label htmlFor='email'>Email</label>
                        <input className='inp' onChange={changer} value={formData.email} type="email" name='email' required/>

                        <label htmlFor='password'>Password</label>
                        <input className='inp' onChange={changer} value={formData.password} type="password" name='password' required/>

                        <label htmlFor='password2'>Repeat password</label>
                        <input className='inp' onChange={changer} value={formData.password2} type="password" name='password2' required/>

                        </>
                    
                 ) : step === 2 ? (
                    <>
                    <label htmlFor='name'>Dog name</label>
                    <input className='inp' onChange={changer} value={formData.dogname} name='dogname' required/>

                    <AutoCompleteBreed setFormData={setFormData} formData={formData}/>

                    <label htmlFor='age'>Age (max 20)</label>
                    <input className='inp' type="number" min="1" max="20" onChange={changer} value={formData.age} name='age' required/>

                    <label htmlFor=''>Gender</label>
                    <span>
                        <button name="gender" className={`selectGenderbtn  ${formData.gender === 'boy' ? 'on' : 'off'}`} value='boy' onClick={changer}>Boy</button>
                        <button name="gender" className={`selectGenderbtn  ${formData.gender === 'girl' ? 'on' : 'off'}`} value='girl' onClick={changer}>Girl</button>
                    </span>

                    <AutoCompleteField setFormData={setFormData} formData={formData}/>

                    <label htmlFor='description'>Description</label>
                    <textarea className="inp tarea" value={formData.description} onChange={changer} name='description'></textarea>

                    </>
                 ) : step === 3 ? (
                    <>

                    <div className='imgcontainer'>
                    <label htmlFor="photos" className="photolabel">Photos (1 - 3)</label>
                    <input type="file" style={{ display: 'none' }} onChange={handleFileChange} name="photos" id="photos" multiple/>
                        {selectedFiles.map((file, index) => (
                        <img className='previewImg' key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                        ))}
                    </div>

                    </>
                 ) : null 
                 
                

                }

    </>
               
        )
}