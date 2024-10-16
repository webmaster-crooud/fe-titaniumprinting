import React, { useState } from 'react';

function DynamicInputFields() {
   const [inputFields, setInputFields] = useState<string[]>([]);

   const handleAdd = () => {
      setInputFields([...inputFields, '']);
   };

   const handleRemove = (index: number) => {
      const updatedFields = inputFields.filter((_, i) => i !== index);
      setInputFields(updatedFields);
   };

   const handleChange = (index: number, value: string) => {
      const updatedFields = [...inputFields];
      updatedFields[index] = value;
      setInputFields(updatedFields);
   };

   return (
      <div>
         {inputFields.map((value, index) => (
            <div key={index}>
               <input type="text" value={value} onChange={(e) => handleChange(index, e.target.value)} />
               <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
         ))}
         <button onClick={handleAdd}>Add</button>
      </div>
   );
}

export default DynamicInputFields;
