import { configureStore } from '@reduxjs/toolkit';
import RegSlc from './RegisterSlice';

export default configureStore({
    reducer: {
      register: RegSlc
    },
  })