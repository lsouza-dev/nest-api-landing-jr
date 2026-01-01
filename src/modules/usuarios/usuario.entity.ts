import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'usuarios'
})
export class Usuario{

    @PrimaryGeneratedColumn()
    id:number

    @Column('varchar',{length:50,nullable:false})
    nome:string

    @Column('varchar',{length:100,unique:true,nullable:false})
    email:string

    @Column('varchar',{length:255,nullable:false})
    senha:string
}