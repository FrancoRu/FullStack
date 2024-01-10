// Input.tsx
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
type InputProps = {
  type: string
  name: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  value?: string | undefined
  register: UseFormRegister<any>
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  required,
  minLength,
  maxLength,
  value,
  register
}) => {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      {...register(name, {
        required: { value: required ?? false, message: `${name} is required` },
        minLength: {
          value: minLength ?? 0,
          message: `The minimum length for the ${name} is ${minLength}`
        },
        maxLength: {
          value: maxLength ?? Infinity,
          message: `The maximum length for the ${name} is ${maxLength}`
        }
      })}
    />
  )
}

export default Input
