import { Usuario } from "src/modules/usuarios/usuario.entity"

export class UsuarioResponseDTO {
    id:number
    nome:string
    email:string

    constructor(u:Usuario){
        this.id = u.id
        this.nome = u.nome
        this.email = u.email
    }
}