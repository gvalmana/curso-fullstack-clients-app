import { Region } from "./region";

export class Cliente {
  id: number = 0;
  name: string = '';
  lastname: string = '';
  createAt: string = '';
  updateAt: string = '';
  email: string = '';
  photo: string = '';
  region: Region = new Region();
}
