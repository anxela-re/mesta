import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ProfileDTO } from '../../models/profile.dto';
import * as ProfilesActions from '../../actions';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss'],
})
export class ProfileItemComponent implements OnInit {
  @Input()
  profile!: ProfileDTO;

  faTrash = faTrashAlt;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (!this.profile) {
      return;
    }
  }

  getIdModal(): string {
    return 'profile-delete-' + this.profile.id;
  }

  editProfile(profileId: number | undefined): void {
    if (profileId) {
      this.router.navigate(['/profile', profileId]);
    }
  }

  deleteProfile(e: MouseEvent): void {
    e.stopPropagation();
    this.sharedService.openModal(
      this.getIdModal(),
      '¡Cuidado!',
      'Si elimina el perfil, todas las recetas y componentes asociados serán eliminados sin opción a recuperarlos, ¿Desea continuar de todas formas?'
    );
  }

  deleteProfileConfirm(): void {
    if (this.profile.id) {
      this.store.dispatch(
        ProfilesActions.deleteProfile({ profileId: this.profile.id })
      );
    }
  }
}
