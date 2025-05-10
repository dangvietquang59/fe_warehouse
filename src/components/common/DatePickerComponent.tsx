import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface DatePickerComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  format?: string;
  control: Control<any>;
  showTime?: boolean;
  disabledDate?: (current: dayjs.Dayjs) => boolean;
  size?: 'large' | 'middle' | 'small';
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  format = 'DD/MM/YYYY',
  control,
  showTime = false,
  disabledDate,
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
        render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
          <div className="relative">
            <DatePicker
              {...field}
              value={value ? dayjs(value) : null}
              onChange={(date) => onChange(date ? date.toISOString() : null)}
              format={format}
              placeholder={placeholder}
              disabled={disabled}
              status={error ? 'error' : ''}
              showTime={showTime}
              disabledDate={disabledDate}
              size={size}
              suffixIcon={<CalendarOutlined className="text-gray-400" />}
              className={`w-full rounded-lg transition-all duration-200 ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
              style={{
                height: '50px',
                fontSize: '16px',
              }}
              popupClassName="rounded-lg shadow-lg"
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

export default DatePickerComponent;
