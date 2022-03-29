export class LoginPresenter {
  constructor(public formulario:LoginPresenter, public ip?:string | null){
      return {...formulario, ip}
  }
}
