// redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import { getDrugModalitiesReducer, postDrugModalitiesReducer, updateDrugModalitiesReducer } from './drugmodailities/reducers';

const rootReducer = combineReducers({
  getDrugModalitiesReducerRes: getDrugModalitiesReducer,
  postDrugModalitiesReducerRes: postDrugModalitiesReducer,
  updateDrugModalitiesReducerRes: updateDrugModalitiesReducer
})

export default rootReducer
