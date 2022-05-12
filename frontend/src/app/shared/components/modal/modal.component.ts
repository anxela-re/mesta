import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  onClose(): void {
    this.sharedService.manageModal('', '', false);
  }
}
