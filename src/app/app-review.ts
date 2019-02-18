import { Review } from './review';
import { Comentario } from './comentario';

export class AppReview {
    id: number;
    
    reviews: Review[];
    nota: number;
    comentarios: Comentario[];
    
    idAplicacao: number;
    descricao: string; //Caso mude a descricao da aplicacao, alterar aqui
    categoria: string; //Caso mude a categoria da aplicacao, alterar aqui
}