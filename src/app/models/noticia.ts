export interface Noticia {

    id : number,
    titulo: string,
    resumen: string,
    imagenNoticia: string,
    contenidoHtml: string,
    publicada: boolean,
    fecha: Date, // Fecha en la que se publica la noticia.
    Empresa : {id : number},

}
