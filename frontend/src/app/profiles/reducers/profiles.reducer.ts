import { Action, createReducer, on } from '@ngrx/store';
import * as ProfilesActions from '../actions';
import { ProfileDTO } from '../models/profile.dto';

export interface ProfilesState {
  profiles: ProfileDTO[];
  selected: number | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProfilesState = {
  profiles: [],
  selected: undefined,
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(ProfilesActions.getProfilesByUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ProfilesActions.getProfilesByUserSuccess, (state, { profiles }) => ({
    ...state,
    profiles: profiles,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(ProfilesActions.getProfilesByUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(ProfilesActions.createProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ProfilesActions.createProfileSuccess, (state, { profile }) => ({
    ...state,
    profiles: [...state.profiles, profile],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(ProfilesActions.createProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(ProfilesActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ProfilesActions.updateProfileSuccess, (state, { profile }) => ({
    ...state,
    profiles: state.profiles.map((currentProfile) => {
      if (currentProfile.id?.toString() === profile.id?.toString()) {
        return {
          ...profile,
          phases: currentProfile.phases,
          properties: currentProfile.properties,
          compositions: currentProfile.compositions,
        };
      } else {
        return currentProfile;
      }
    }),
    loading: false,
    loaded: true,
    error: null,
  })),
  on(ProfilesActions.updateProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(ProfilesActions.deleteProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ProfilesActions.deleteProfileSuccess, (state, { profileId }) => ({
    ...state,
    profiles: state.profiles.filter(
      (currentProfile) => currentProfile.id !== profileId
    ),
    selected: state.selected === profileId ? undefined : state.selected,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(ProfilesActions.deleteProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(ProfilesActions.selectProfile, (state, { profile }) => ({
    ...state,
    selected: profile.id,
  })),
  on(ProfilesActions.assignPhases, (state, { profile_id, phases }) => ({
    ...state,
    profiles: state.profiles.map((profile) => {
      if (profile_id === profile.id) {
        profile.phases = phases;
      }
      return profile;
    }),
  })),
  on(ProfilesActions.assignProperties, (state, { profile_id, properties }) => ({
    ...state,
    profiles: state.profiles.map((profile) => {
      if (profile_id === profile.id) {
        profile.properties = properties;
      }
      return profile;
    }),
  })),
  on(
    ProfilesActions.assignCompositions,
    (state, { profile_id, compositions }) => ({
      ...state,
      profiles: state.profiles.map((profile) => {
        if (profile_id === profile.id) {
          profile.compositions = compositions;
        }
        return profile;
      }),
    })
  )
);

export function profileReducer(
  state: ProfilesState | undefined,
  action: Action
): ProfilesState {
  return _userReducer(state, action);
}
