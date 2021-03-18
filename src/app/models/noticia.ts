export interface Noticia {

    id : string,
    titulo: string,
    resumen: string,
    imagenNoticia: string,
    contenidoHtml: string,
    publicada: boolean,
    fecha: Date, // Fecha en la que se publica la noticia.
    Empresa : {id : string},

}
