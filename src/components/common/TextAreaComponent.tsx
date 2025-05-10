import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

interface TextAreaComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
  maxLength?: number;
  control: Control<any>;
  autoSize?: boolean | { minRows: number; maxRows: number };
  showCount?: boolean;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  rows = 4,
  maxLength,
  control,
  autoSize,
  showCount = false,
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
            <Input.TextArea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
              status={error ? 'error' : ''}
              autoSize={autoSize || { minRows: 4, maxRows: 8 }}
              showCount={showCount}
              className={`w-full rounded-lg transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${disabled ? 'bg-gray-100' : 'bg-white'} text-base`}
              style={{
                padding: '12px 16px',
                minHeight: '120px',
                fontSize: '16px',
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

export default TextAreaComponent;
