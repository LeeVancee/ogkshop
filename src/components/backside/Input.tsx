'use client';

import clsx from 'clsx';
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';
import React from "react";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({label, id, register, required, errors, type, disabled}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, {required})}
                    className={clsx(
                        `
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",`,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    );
};

export default Input;
