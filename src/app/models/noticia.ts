import { Empresa } from "./empresa";


export interface Noticia {

    id : number,
    titulo: string,
    resumen: string,
    imagenNoticia?: null,
    content: string,
    publicado: boolean,
    fecha: Date, // Fecha en la que se publica la noticia.
    empresa : Empresa,
    imgHashCode: any
}
