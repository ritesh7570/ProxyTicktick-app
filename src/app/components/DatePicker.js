'use client';

import React, { useState } from 'react';
import { format, addDays, addMonths, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { CalendarIcon } from '@heroicons/react/outline';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);

  // Function to generate recurring dates based on selected date and recurrence type
  const generateRecurringDates = (startDate, recurrenceType, interval) => {
    if (!startDate) return [];
    
    const recurringDates = [];
    let currentDate = new Date(startDate);
    
    for (let i = 0; i < 30; i++) { // Limit to the next 30 occurrences for now
      recurringDates.push(currentDate);
      
      switch (recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, interval);
          break;
        case 'weekly':
          currentDate = addDays(currentDate, 7 * interval);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, interval);
          break;
        default:
          break;
      }
    }
    return recurringDates;
  };

  const recurringDates = generateRecurringDates(selectedDate, recurrenceType, recurrenceInterval);

  // Render the mini-calendar for the current month
  const renderCalendar = () => {
    if (!selectedDate) return <p>Select a date to preview recurrence</p>;

    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());
    const daysInMonth = [];
    
    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
      const isRecurring = recurringDates.some(recurringDate => isSameDay(day, recurringDate));
      
      daysInMonth.push(
        <div
          key={day.toString()}
          className={`p-2 border text-black ${isRecurring ? 'bg-blue-300' : ''}`}
        >
          {format(day, 'd')}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-1 text-black">{daysInMonth}</div>;
  };

  return (
    <div className="p-4 text-black">
      <div className="mb-4">
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2"
        />
      </div>
      
      <div className="mb-4">
        <label>Recurrence Type:</label>
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value)}
          className="border p-2 ml-2"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label>Every:</label>
        <input
          type="number"
          value={recurrenceInterval}
          onChange={(e) => setRecurrenceInterval(parseInt(e.target.value))}
          className="border p-2 ml-2"
          min={1}
        />{' '}
        {recurrenceType === 'daily' ? 'days' : recurrenceType === 'weekly' ? 'weeks' : 'months'}
      </div>
      
      <h3>Mini Calendar Preview:</h3>
      <div className="border rounded p-4">{renderCalendar()}</div>
    </div>
  );
};

export default DatePicker;
