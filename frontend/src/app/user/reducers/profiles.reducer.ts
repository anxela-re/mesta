import { Action, createReducer, on } from '@ngrx/store';
import { PhasesActions, ProfilesActions } from '../actions';
import { PhaseDTO } from '../models/phase.dto';
import { ProfileDTO } from '../models/profile.dto';
import { UserDTO } from '../models/user.dto';

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
  on(PhasesActions.getPhasesByProfile, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(
    PhasesActions.getPhasesByProfileSuccess,
    (state, { profileId, phases }) => ({
      ...state,
      profiles: state.profiles.map((profile) => {
        if (profile.id === profileId) {
          profile.phases = phases;
        }
        return profile;
      }),
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(PhasesActions.getPhasesByProfileFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(PhasesActions.createPhase, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(PhasesActions.createPhaseSuccess, (state, { profileId, phase }) => ({
    ...state,
    profiles: state.profiles.map((profile) => {
      if (profile.id === profileId) {
        profile.phases = [...(profile.phases || []), phase];
      }
      return profile;
    }),
    loading: false,
    loaded: true,
    error: null,
  })),
  on(PhasesActions.createPhaseFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(PhasesActions.updatePhase, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(PhasesActions.updatePhaseSuccess, (state, { phaseId, phase }) => ({
    ...state,
    profiles: state.profiles.map((profile) => {
      profile.phases = profile.phases?.map((currentPhase) => {
        if (currentPhase.id === phaseId) {
          return phase;
        } else {
          return currentPhase;
        }
      });
      return profile;
    }),
    loading: false,
    loaded: true,
    error: null,
  })),
  on(PhasesActions.updatePhaseFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(PhasesActions.deletePhase, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(PhasesActions.deletePhaseSuccess, (state, { phaseId }) => ({
    ...state,
    profiles: state.profiles.map((profile) => ({
      ...profile,
      phases: profile.phases?.filter(({ id }) => id !== phaseId) || [],
    })),
    loading: false,
    loaded: true,
    error: null,
  })),
  on(PhasesActions.deletePhaseFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function profileReducer(
  state: ProfilesState | undefined,
  action: Action
): ProfilesState {
  return _userReducer(state, action);
}
