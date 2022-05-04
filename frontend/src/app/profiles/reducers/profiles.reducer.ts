import { Action, createReducer, on } from '@ngrx/store';
import * as ProfilesActions from '../actions';
import { ProfileDTO } from '../models/profile.dto';
import { UserDTO } from '../../user/models/user.dto';

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
        return profile;
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
  on(ProfilesActions.selectProfile, (state, { profileId }) => ({
    ...state,
    selected: profileId,
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
  on(ProfilesActions.assignPhases, (state, { profile_id, phases }) => ({
    ...state,
    profiles: state.profiles.map((profile) => {
      if (profile_id === profile.id) {
        profile.phases = phases;
      }
      return profile;
    }),
  }))
);

export function profileReducer(
  state: ProfilesState | undefined,
  action: Action
): ProfilesState {
  return _userReducer(state, action);
}
