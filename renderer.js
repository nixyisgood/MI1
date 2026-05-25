const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const mi1Orbe = document.getElementById('mi1-orbe');
const statusText = document.getElementById('model-select'); // Usaremos el selector para mostrar estados también

// Esta variable se actualizará sola cuando selecciones una opción en la interfaz
let currentModel = ''; 

let conversationHistory = [
    {
        role: "system",
        content: "Eres MI1, una entidad de IA experta en programación de software. Das respuestas directas, soluciones funcionales en código y explicaciones técnicas breves."
    }
];

// 1. FUNCIÓN AUTOMÁTICA: Cargar los modelos que tienes instalados en Ollama
async function loadLocalModels() {
    try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) throw new Error('No se pudo obtener la lista de modelos');
        
        const data = await response.json();
        
        // Limpiamos el selector
        statusText.innerHTML = '';
        
        if (data.models && data.models.length > 0) {
            data.models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.name;
                option.textContent = model.name.toUpperCase();
                statusText.appendChild(option);
            });
            
            // Elegimos el primero por defecto automáticamente
            currentModel = data.models[0].name;
            appendMessage('ai', `MI1: Sincronizado con el núcleo [${currentModel.toUpperCase()}]. Listo para operar.`);
        } else {
            statusText.innerHTML = '<option>No hay modelos</option>';
            appendMessage('ai', 'MI1: Alerta. No se detectaron modelos instalados en Ollama.');
        }
    } catch (error) {
        console.error(error);
        statusText.innerHTML = '<option>Fallo de conexión</option>';
        appendMessage('ai', 'MI1: Error crítico. No se pudo conectar con el servicio local de Ollama. Revisa tu terminal.');
    }
}

// Escuchar cuando cambies el modelo en el menú desplegable
statusText.addEventListener('change', (e) => {
    currentModel = e.target.value;
    appendMessage('ai', `MI1: Conmutando núcleo de procesamiento a [${currentModel.toUpperCase()}].`);
    window.speechSynthesis.cancel(); // Detener cualquier voz del modelo anterior
});

// 2. FUNCIÓN DE VOZ
function speak(text) {
    window.speechSynthesis.cancel();
    const textoLimpio = text.replace(/```[\s\S]*?```/g, "[Bloque de código en pantalla]");
    if (!textoLimpio.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textoLimpio);
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
    if (spanishVoice) utterance.voice = spanishVoice;

    utterance.rate = 1.1;
    utterance.pitch = 0.9;

    utterance.onstart = () => mi1Orbe.classList.add('hablando');
    utterance.onend = () => mi1Orbe.classList.remove('hablando');

    window.speechSynthesis.speak(utterance);
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return messageDiv;
}

// 3. FUNCIÓN DE ENVÍO DE MENSAJES (STREAMING)
async function sendMessageToOllama() {
    const text = userInput.value.trim();
    if (!text || !currentModel) return;

    appendMessage('user', text);
    userInput.value = '';

    conversationHistory.push({ role: "user", content: text });

    const aiMessageElement = appendMessage('ai', 'MI1: ');

    try {
        const response = await fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: currentModel, // Usa el modelo seleccionado en el menú
                messages: conversationHistory,
                stream: true
            })
        });

        if (!response.ok) throw new Error('Error en la transmisión');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.trim() !== '') {
                    const parsed = JSON.parse(line);
                    if (parsed.message && parsed.message.content) {
                        fullResponse += parsed.message.content;
                        aiMessageElement.textContent = `MI1: ${fullResponse}`;
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }
            }
        }

        conversationHistory.push({ role: "assistant", content: fullResponse });
        speak(fullResponse);

    } catch (error) {
        console.error(error);
        aiMessageElement.textContent = "Error: Pérdida de paquetes en el enlace con el modelo local.";
    }
}

sendBtn.addEventListener('click', sendMessageToOllama);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageToOllama();
    }
});

// Cargar modelos al iniciar la interfaz
loadLocalModels();
window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };