// store/useDatePickerStore.js
import { create } from 'zustand';

const useDatePickerStore = create((set) => ({
  startDate: new Date(),
  endDate: null,
  recurrenceType: 'daily',
  recurrenceSettings: {},
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setRecurrenceSettings: (settings) => set({ recurrenceSettings: settings }),
}));
export default useDatePickerStore;
