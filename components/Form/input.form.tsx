import React, { ChangeEvent } from 'react';

interface propsInputForm {
   label: string;
   type?: string;
   value?: string | number;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   placeholder: string;
   name: string;
   isRequired?: boolean;
}

export const InputForm: React.FC<propsInputForm> = ({ label, type = 'text', placeholder, name, isRequired = false, value, onChange }) => {
   return (
      <div>
         <label htmlFor="name" className="text-sm font-semibold">
            {label}
         </label>
         <input
            autoComplete="off"
            onChange={onChange}
            value={value}
            type={type}
            placeholder={placeholder}
            name={name}
            className="form-input"
            required={isRequired}
         />
      </div>
   );
};
