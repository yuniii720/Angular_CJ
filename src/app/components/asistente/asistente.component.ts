import { Component } from '@angular/core';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css']
})
export class AsistenteComponent {

  dataFromPHP: {
    Tarjetas: { pregunta: string; respuesta: string }[];
    Transferencias: { pregunta: string; respuesta: string }[];
    Saldo: { pregunta: string; respuesta: string }[];
    Clientes: { pregunta: string; respuesta: string }[];
    [key: string]: { pregunta: string; respuesta: string }[];
  } = {
    Tarjetas: [
      {
        pregunta: "¿Cómo puedo solicitar una nueva tarjeta de débito o crédito?",
        respuesta: "Puedes solicitar una nueva tarjeta visitando cualquiera de nuestras sucursales o a través de la banca en línea."
      },
      {
        pregunta: "¿Cómo puedo activar mi tarjeta nueva?",
        respuesta: "Para activar tu tarjeta nueva, sigue las instrucciones incluidas en el sobre de la tarjeta o llámanos al número de atención al cliente."
      },
      {
        pregunta: "¿Cómo puedo reportar una tarjeta perdida o robada?",
        respuesta: "Si has perdido tu tarjeta o te la han robado, debes reportarlo de inmediato llamando al número de atención al cliente para que podamos bloquearla y emitir una nueva."
      }
    ],
    Transferencias: [
      {
        pregunta: "¿Cómo puedo realizar una transferencia a otra cuenta bancaria?",
        respuesta: "Puedes realizar transferencias a otras cuentas bancarias a través de nuestra banca en línea, seleccionando la opción de transferencias y siguiendo los pasos indicados."
      },
      {
        pregunta: "¿Cuáles son los requisitos para realizar una transferencia internacional?",
        respuesta: "Para realizar una transferencia internacional, necesitas tener los datos completos de la cuenta de destino, incluyendo el código SWIFT/BIC y el IBAN, además de cumplir con las regulaciones de transferencias internacionales."
      },
      {
        pregunta: "¿Cómo puedo programar una transferencia para una fecha futura?",
        respuesta: "En la banca en línea, puedes programar una transferencia para una fecha futura seleccionando la opción de programación de pagos y configurando la fecha y monto de la transferencia."
      }
    ],
    Saldo: [
      {
        pregunta: "¿Cómo puedo verificar mi saldo actual?",
        respuesta: "Puedes verificar tu saldo actual en cualquier momento a través de nuestra aplicación móvil, la banca en línea o visitando uno de nuestros cajeros automáticos."
      },
      {
        pregunta: "¿Puedo recibir notificaciones de mi saldo en tiempo real?",
        respuesta: "Sí, puedes configurar notificaciones para recibir alertas de tu saldo en tiempo real a través de la aplicación móvil o la banca en línea."
      },
      {
        pregunta: "¿Cómo puedo consultar mi historial de transacciones?",
        respuesta: "Puedes consultar tu historial de transacciones recientes en la sección de movimientos de tu cuenta en la banca en línea o la aplicación móvil."
      }
    ],
    Clientes: [
      {
        pregunta: "¿Cómo puedo abrir una cuenta bancaria con VN Bank?",
        respuesta: "Puedes abrir una cuenta bancaria con nosotros visitando una de nuestras sucursales y presentando los documentos necesarios de identificación y residencia."
      },
      {
        pregunta: "¿Cómo puedo obtener ayuda personalizada con mis finanzas?",
        respuesta: "Para obtener ayuda personalizada con tus finanzas, puedes programar una cita con uno de nuestros asesores financieros en cualquiera de nuestras sucursales."
      },
      {
        pregunta: "¿Qué debo hacer si tengo un problema con mi cuenta o transacción?",
        respuesta: "Si tienes algún problema con tu cuenta o una transacción, comunícate con nuestro servicio de atención al cliente para recibir asistencia inmediata."
      }
    ]
  };

  chatDisplay: HTMLElement | null = null;
  userInput: HTMLInputElement | null = null;
  isChatbotVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.chatDisplay = document.getElementById('chat-display');
    this.userInput = document.getElementById('user-input') as HTMLInputElement;
    this.showInitialOptions();
  }

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }

  showInitialOptions() {
    if (this.chatDisplay) {
      this.chatDisplay.innerHTML = `
        <h1 id="bienvenida">¡Bienvenido a VN Bank!</h1>
        <h2 id="bienvenida2">¿En qué puedo ayudarte?</h2>
      `;
      const initialOptions = ["Tarjetas", "Transferencias", "Saldo", "Clientes"];
      initialOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerText = option.charAt(0).toUpperCase() + option.slice(1);
        optionElement.addEventListener('click', () => {
          document.getElementById('bienvenida')!.style.display = 'none';
          document.getElementById('bienvenida2')!.style.display = 'none';
          this.showRelatedQuestions(option);
        });
        this.chatDisplay?.appendChild(optionElement);
      });
    }
  }

  showRelatedQuestions(option: string) {
    if (this.chatDisplay) {
      this.chatDisplay.innerHTML = "";
      const preguntas = this.dataFromPHP[option];
      preguntas.forEach(pregunta => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerText = pregunta.pregunta;
        questionElement.addEventListener('click', () => this.showAnswer(pregunta));
        this.chatDisplay?.appendChild(questionElement);
      });
    }
  }

  showAnswer(pregunta: { pregunta: string; respuesta: string }) {
    if (this.chatDisplay) {
      this.chatDisplay.innerHTML = pregunta.respuesta;
    }
  }

  sendUserInput() {
    if (this.userInput) {
      const userMessage = this.userInput.value;
      if (userMessage.trim() !== "") {
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('user-message');
        userMessageElement.innerText = userMessage;
        this.chatDisplay?.appendChild(userMessageElement);
        this.userInput.value = "";
      }
    }
  }

  volver() {
    this.isChatbotVisible = true;
    this.showInitialOptions();
  }

}

export default AsistenteComponent;
