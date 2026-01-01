import { Module } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            Usuario
        ])
    ],
    providers: [UsuarioService,UsuarioRepository],
    controllers: [UsuarioController],
    exports: [UsuarioService]
})
export class UsuarioModule {

}