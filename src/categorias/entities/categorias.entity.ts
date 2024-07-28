import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Jogo } from '../../jogos/entities/jogos.entity';


@Entity({ name: 'tb_categorias' })

export class Categoria {
  
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  tipo: string;
 
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  produto : string;

  @OneToMany(() => Jogo, (jogo) => jogo.categoria)
  jogo: Jogo[]
}