import { Component } from "react";
import "./App.css";
//import Visualizador from './components/Visualizador';
//import "https://cdnjs.cloudflare.com/ajax/libs/marked/5.0.2/marked.min.js";
//import "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
//import { marked } from "https://cdn.jsdelivr.net/npm/marked/marked.min.js";

//import DOMPurify.sanitize from 'src/dompurify'
import { marked } from "marked";
import DOMPurify from "dompurify";
import { ParseMarkdownToHtml } from "./components/ParserMarkdownToHtml";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrada: "",
      compilado: "",
      max_editor: false,
      res_editor: true,
      max_prev: false,
      res_prev: true
    };
  }
  clearEditor = () => {
    //alert("Hizo click en el botón Limpiar");
    this.setState({
      entrada: "",
      compilado: ""
    });
  };

  compilarTexto = (texto) => {
    console.log("texto a convertir: ", texto);
    const textoCompilado = DOMPurify.sanitize(marked.parse(texto), {
      USE_PROFILES: { html: true }
    });
    console.log(`Texto convertido: ${textoCompilado}`);
    return textoCompilado;
  };

  handleChange = (e) => {
    let textoEntrado = String(e.target.value);
    //alert("Evento para manejar los cambios en el area de texto");
    let salida = this.compilarTexto(textoEntrado);
    this.setState({
      entrada: textoEntrado,
      compilado: salida
    });
    document.getElementById("preview").innerHTML = salida;
  };
  handleToggle = () => {
    this.setState({
      max_editor: !this.state.max_editor,
      res_editor: !this.state.res_editor,
      max_prev: !this.state.max_prev,
      res_prev: !this.state.res_prev
    });
  };

  maximizarEditor = (e) => {
    console.log("evento target ----> ", e.target.id);
    console.log("Debe maximizar panel Editor");
    this.handleToggle();
    document.querySelector(".section-editor").classList.toggle("ampliar");
    document.querySelector(".previsualizador").classList.toggle("ocultar");
    console.log("final de metodo maximizar Editor");
  };
  maximizarPrevio = (e) => {
    console.log("evento target ----> ", e.target.id);
    console.log("Debe maximizar panel Visualizador");
    this.handleToggle();
    document.querySelector(".previsualizador").classList.toggle("ampliar");
    document.querySelector(".section-editor").classList.toggle("ocultar");
    console.log("final de metodo maximizar Previsualizador");
  };
  componentDidMount() {
    console.log("EJECUCIÓN DEL MÉTODO COMPONENTDIDMOUNT");
  }

  render() {
    let max = "🗖",
      res = "_";
    const clasesEditor = "section-editor";
    const clasesPrev = "previsualizador";

    return (
      <>
        <section className={clasesEditor}>
          <div className="toolbar">
            <h2>Editor</h2>
            <div className="botones">
              <button id="editor-btn-max" onClick={this.maximizarEditor}>
                {max}
              </button>
              <button id="editor-btn-clear" onClick={this.clearEditor}>
                Clear
              </button>
            </div>
          </div>
          <textarea
            name="area-t1"
            id="editor"
            cols="70"
            rows="80"
            onChange={this.handleChange}
            value={this.state.entrada}
            placeholder="Ingresa el Texto en Formato Markdown"
          />
        </section>

        {/* Aqui debo cambiar el valor de contenido enviado como props */}
        <section className={clasesPrev}>
          <div className="toolbar">
            <h2>Vista Previa</h2>
            <button id="prev-btn-max" onClick={this.maximizarPrevio}>
              Max
            </button>
          </div>
          <textarea name="area-t1" id="preview" cols="70" rows="80" disabled>
            {ParseMarkdownToHtml(this.state.compilado, "preview")}
          </textarea>
        </section>
      </>
    );
  }
}
