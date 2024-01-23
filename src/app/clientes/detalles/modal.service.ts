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
    console.log(this.showModal)
    console.log("Modal abierto")
  }
  close(): void {
    this.showModal = false;
    console.log(this.showModal)
    console.log("Modal cerrado")
  }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }
}
