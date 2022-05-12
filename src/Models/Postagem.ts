import Tema from "./Tema"

interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    data: string;
    tema?: Tema | null;
}
    /* o ponto de interrogação indica que o tema pode ser omitido quando foi criada uma postagem e importamos o tema porque as informações serão recebidas dos atributos desenvolvidos no tema. */


export default Postagem