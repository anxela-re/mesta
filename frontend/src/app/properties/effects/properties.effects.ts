import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as propertiesActions from '../actions';
import * as profilesActions from '../../profiles/actions';
import { PropertiesService } from '../services/properties.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class PropertiesEffects {
  constructor(
    private actions$: Actions,
    private propertiesService: PropertiesService,
    private toastService: ToastService,
    private store: Store<AppState>,
    private loadingService: LoadingService
  ) {}
  getPropertiesByProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(propertiesActions.getPropertiesByProfile),
      exhaustMap(({ profile_id }) => {
        this.loadingService.showLoading('properties_getPropertiesByProfile');
        return this.propertiesService.getProperties({ profile_id }).pipe(
          map((data) => {
            return propertiesActions.getPropertiesByProfileSuccess({
              properties: data,
              profile_id,
            });
          }),
          catchError((error) => {
            return of(
              propertiesActions.getPropertiesByProfileFailure({
                payload: error,
              })
            );
          })
        );
      })
    )
  );

  getPropertiesByProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.getPropertiesByProfileSuccess),
        map(({ profile_id, properties }) => {
          this.loadingService.hideLoading('properties_getPropertiesByProfile');
          this.store.dispatch(
            profilesActions.assignProperties({ profile_id, properties })
          );
        })
      ),
    { dispatch: false }
  );

  getPropertiesByProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.getPropertiesByProfileFailure),
        map(async () => {
          this.loadingService.hideLoading('properties_getPropertiesByProfile');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
  createProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(propertiesActions.createProperty),
      exhaustMap(({ property }) => {
        this.loadingService.showLoading('properties_createProperty');
        return this.propertiesService.createProperty(property).pipe(
          map((data) => {
            return propertiesActions.createPropertySuccess({
              property: data.data,
              profile_id: data.data.profile_id,
            });
          }),
          catchError((error) => {
            return of(
              propertiesActions.createPropertyFailure({ payload: error })
            );
          })
        );
      })
    )
  );

  createPropertySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.createPropertySuccess),
        map(({ profile_id }) => {
          this.loadingService.hideLoading('properties_createProperty');
          this.store.select('properties').subscribe(({ properties }) => {
            this.store.dispatch(
              profilesActions.assignProperties({ profile_id, properties })
            );
          });
        })
      ),
    { dispatch: false }
  );

  createPropertyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.createPropertyFailure),
        map(async () => {
          this.loadingService.hideLoading('properties_createProperty');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
  updateProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(propertiesActions.updateProperty),
      exhaustMap(({ property }) => {
        this.loadingService.showLoading('properties_updateProperty');
        return this.propertiesService.updateProperty(property).pipe(
          map((data) => {
            return propertiesActions.updatePropertySuccess({
              property: data.data,
              profile_id: data.data.profile_id,
            });
          }),
          catchError((error) => {
            return of(
              propertiesActions.updatePropertyFailure({ payload: error })
            );
          })
        );
      })
    )
  );

  updatePropertySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.updatePropertySuccess),
        map(({ profile_id }) => {
          this.loadingService.hideLoading('properties_updateProperty');
          this.store.select('properties').subscribe(({ properties }) => {
            this.store.dispatch(
              profilesActions.assignProperties({ profile_id, properties })
            );
          });
        })
      ),
    { dispatch: false }
  );

  updatePropertyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.updatePropertyFailure),
        map(async () => {
          this.loadingService.hideLoading('properties_updateProperty');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
  deleteProperty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(propertiesActions.deleteProperty),
      exhaustMap(({ propertyId, profile_id }) => {
        this.loadingService.showLoading('properties_deleteProperty');
        return this.propertiesService.deleteProperty(propertyId).pipe(
          map(() => {
            return propertiesActions.deletePropertySuccess({
              propertyId: propertyId,
              profile_id,
            });
          }),
          catchError((error) => {
            return of(
              propertiesActions.deletePropertyFailure({ payload: error })
            );
          })
        );
      })
    )
  );

  deletePropertySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.deletePropertySuccess),
        map(({ profile_id }) => {
          this.loadingService.hideLoading('properties_deleteProperty');
          this.store.select('properties').subscribe(({ properties }) => {
            this.store.dispatch(
              profilesActions.assignProperties({ profile_id, properties })
            );
          });
        })
      ),
    { dispatch: false }
  );

  deletePropertyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(propertiesActions.deletePropertyFailure),
        map(async () => {
          this.loadingService.hideLoading('properties_deleteProperty');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
}
