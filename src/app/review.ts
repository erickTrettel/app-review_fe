import { Comentario } from './comentario';

export class Review {
    id: number;
    review: string;
    nota: number;
    
    idAplicacao: number;
    descricaoAplicacao: string;
    
    usuarioId: string;
    usuarioNome: string; //Caso altere o nome do usuario, deve ser alterado aqui
    usuarioEmail: string;
    usuarioFoto: string;
}