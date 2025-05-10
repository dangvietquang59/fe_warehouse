import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Select } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { DownOutlined } from '@ant-design/icons';

interface Option {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  mode?: 'multiple' | 'tags';
  control: Control<any>;
  loading?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  size?: 'large' | 'middle' | 'small';
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  label,
  placeholder,
  options,
  required = false,
  disabled = false,
  className = '',
  mode,
  control,
  loading = false,
  allowClear = true,
  showSearch = true,
  size = 'middle',
}) => {
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
            <Select
              {...field}
              mode={mode}
              placeholder={placeholder}
              disabled={disabled}
              status={error ? 'error' : ''}
              options={options}
              loading={loading}
              allowClear={allowClear}
              showSearch={showSearch}
              size={size}
              suffixIcon={<DownOutlined className="text-gray-400" />}
              className={`w-full rounded-lg transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
              style={{
                height: '50px',
                fontSize: '16px',
              }}
              dropdownStyle={{
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
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

export default SelectComponent;
