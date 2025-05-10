import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import {  MailOutlined, LockOutlined, NumberOutlined } from '@ant-design/icons';

interface InputComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  required?: boolean;
  disabled?: boolean;
  className?: string;
  control: Control<any>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  showCount?: boolean;
  maxLength?: number;
}

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  control,
  prefix,
  suffix,
  showCount,
  maxLength,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'email':
        return <MailOutlined className="text-gray-400" />;
      case 'password':
        return <LockOutlined className="text-gray-400" />;
      case 'number':
        return <NumberOutlined className="text-gray-400" />;
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`form-control ${className}`}
    >
      {label && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="label"
        >
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </motion.label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full rounded-lg border-gray-300 shadow-sm transition-all duration-200 ${
                error ? 'border-red-500' : 'hover:border-blue-400 focus:border-blue-500'
              } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} h-[40px] text-base`}
              style={{
                padding: '0 12px',
              }}
              prefix={prefix || getIcon()}
              suffix={suffix}
              showCount={showCount}
              maxLength={maxLength}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1 absolute"
                >
                  {error.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      />
    </motion.div>
  );
};

export default InputComponent;
