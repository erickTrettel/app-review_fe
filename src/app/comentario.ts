export class Comentario {
    id: number;
    
    usuarioId: string;
    usuarioNome: string; //Caso altere o nome do usuario, deve ser alterado aqui
    usuarioEmail: string;
    usuarioFoto: string;
    
    comentario: string;
}