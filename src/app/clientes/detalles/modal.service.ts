import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showModal: boolean = true;
  private _notificarUpload: EventEmitter<any> = new EventEmitter();
  constructor() { }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  show(): void {
    this.showModal = true;
  }
  close(): void {
    this.showModal = false;
  }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }
}
