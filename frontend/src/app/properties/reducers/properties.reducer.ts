import { Action, createReducer, on } from '@ngrx/store';
import {
  createProperty,
  createPropertyFailure,
  createPropertySuccess,
  deleteProperty,
  deletePropertyFailure,
  deletePropertySuccess,
  getPropertiesByProfile,
  getPropertiesByProfileSuccess,
  getPropertiesByProfileFailure,
  updateProperty,
  updatePropertyFailure,
  updatePropertySuccess,
  assignCurrentProperties,
  filteredProperties,
} from '../actions';
import { PropertyDTO } from '../models/property.dto';

export interface PropertiesState {
  properties: PropertyDTO[];
  filtered: PropertyDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: PropertiesState = {
  properties: [],
  filtered: [],
  loading: false,
  loaded: false,
  error: null,
};

const _propertiesReducer = createReducer(
  initialState,
  on(getPropertiesByProfile, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(getPropertiesByProfileSuccess, (state, { properties, profile_id }) => ({
    ...state,
    properties: properties,
    filtered: [],
    loaded: true,
    loading: false,
    error: null,
  })),
  on(getPropertiesByProfileFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(createProperty, (state, { property }) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(createPropertySuccess, (state, { property, profile_id }) => ({
    ...state,
    properties: [...state.properties, property],
    loaded: true,
    loading: false,
    error: null,
  })),
  on(createPropertyFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(updateProperty, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updatePropertySuccess, (state, { property, profile_id }) => ({
    ...state,
    properties: state.properties.map((prop) => {
      if (prop.id === property.id) {
        return property;
      } else {
        return prop;
      }
    }),
    filtered: [],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updatePropertyFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(deleteProperty, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(deletePropertySuccess, (state, { propertyId, profile_id }) => ({
    ...state,
    properties: state.properties.filter((prop) => prop.id !== propertyId),
    filtered: [],
    loaded: true,
    loading: false,
    error: null,
  })),
  on(deletePropertyFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(assignCurrentProperties, (state, { properties }) => ({
    ...state,
    properties: properties,
    filtered: [],
  })),
  on(filteredProperties, (state, { properties }) => ({
    ...state,
    filtered: properties,
  }))
);

export function propertiesReducer(
  state: PropertiesState | undefined,
  action: Action
): PropertiesState {
  return _propertiesReducer(state, action);
}
