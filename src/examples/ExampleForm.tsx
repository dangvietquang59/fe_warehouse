import React from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputComponent from '../components/common/InputComponent';
import SelectComponent from '../components/common/SelectComponent';
import TextAreaComponent from '../components/common/TextAreaComponent';
import DatePickerComponent from '../components/common/DatePickerComponent';

// Define the form data type
interface FormData {
  name: string;
  email: string;
  role: string;
  description: string;
  birthDate: string | null;
}

// Define the form schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  description: yup.string().required('Description is required'),
  birthDate: yup.string().nullable().required('Birth date is required'),
});

const ExampleForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      name: '',
      email: '',
      role: '',
      description: '',
      birthDate: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputComponent
        name="name"
        label="Name"
        placeholder="Enter your name"
        required
        control={control}
      />
      
      <InputComponent
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        required
        control={control}
      />

      <SelectComponent
        name="role"
        label="Role"
        placeholder="Select your role"
        options={roleOptions}
        required
        control={control}
      />

      <TextAreaComponent
        name="description"
        label="Description"
        placeholder="Enter description"
        required
        rows={4}
        control={control}
      />

      <DatePickerComponent
        name="birthDate"
        label="Birth Date"
        placeholder="Select birth date"
        required
        control={control}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ExampleForm; 