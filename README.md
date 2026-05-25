# MI1 - Inteligencia Artificial Personalizable y Configurable

MI1 es un proyecto innovador dirigido a la Inteligencia Artificial (IA) que utiliza el modelo OLLAMA para crear y
personalizar sistemas de IA flexibles y eficientes. Aquí están las principales características del proyecto:

## ¿Qué es MI1?

MI1 es una solución de inteligencia artificial basada en el modelo OLLAMA que permite a los usuarios crear un
sistema de IA personalizado, configurable y adaptativo.

### Características Principales:

- **Flexibilidad**: Con MI1, los usuarios pueden configurar la IA con múltiples capacidades, desde la
reconocimiento de lenguaje natural hasta la generación de texto.

- **Personalización**: Los usuarios pueden personalizar las respuestas a patrones específicos de lenguaje o
palabras clave, permitiendo que el sistema aprenda y adapte a los comportamientos individuales de los usuarios.

- **Integración con Aplicaciones Móviles y Web**: MI1 ofrece una interfaz para integrar la IA en aplicaciones
móviles o web, proporcionando un control completo sobre cómo se comporta y interactúa con otros dispositivos. Esto
facilita la implementación de la IA en entornos donde los recursos computacionales pueden ser limitados o donde
las necesidades del usuario varían según el lugar.

- **Gestión y Supervisión**: MI1 ofrece una plataforma para gestionar y supervisar todas las actividades de la IA,
lo que permite a los usuarios tomar decisiones informadas sobre el desempeño y la eficiencia de su sistema. Esto
incluye la visualización de estadísticas, el seguimiento de la evolución del aprendizaje y el análisis de la
calidad de las respuestas generadas.

- **Entrenamiento Personalizado**: MI1 permite a los usuarios entrenar a la IA con nuevos datos o modelos
personalizados, permitiendo que los usuarios adapten su sistema a diferentes contextos o necesidades. Esto incluye
la capacidad para crear y supervisar múltiples instancias de la IA, lo que facilita el uso compartido y
colaborativo en entornos colaborativos.

## Instalación y Configuración

Para instalar y configurar MI1, sigue estos pasos:

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/yourusername/mi1.git
cd mi1
```

### Paso 2: Instalar Dependencias

MI1 utiliza varias dependencias que deben instalarse manualmente. Puedes usar `pip` para instalar las dependencias
necesarias:

```bash
pip install -r requirements.txt
```

### Paso 3: Configurar el Entorno

Crea un archivo `.env` en la raíz del proyecto con los siguientes datos de configuración:

```plaintext
# .env

OLLAMA_MODEL=your_ollama_model_name
YOUR_API_KEY=your_ollama_api_key
```

Reemplaza `your_ollama_model_name` con el nombre del modelo de OLLAMA que deseas usar y `your_ollama_api_key` con
tu clave API.

### Paso 4: Ejecutar la Aplicación

Para ejecutar la aplicación, usa el siguiente comando:

```bash
python app.py
```

La aplicación se iniciará en el puerto predeterminado (por defecto es 5000).

### Paso 5: Configurar Interfaz de Usuario

Utiliza una herramienta como Postman o curl para interactuar con la API proporcionada por MI1. Aquí hay un ejemplo
usando `curl`:

```bash
curl -X POST http://localhost:5000/api/chat \
-H "Content-Type: application/json" \
-d '{"message": "Hola, ¿cómo estás?"}'
```

Este comando enviará una solicitud de chat a la API de MI1 y mostrará la respuesta.

## Conclusion

MI1 es una solución avanzada de inteligencia artificial personalizable y configurable basada en OLLAMA, diseñada
para ayudar a los usuarios a crear sistemas de IA flexibles y eficientes. Con su interfaz fácil de usar y
capacidad para adaptarse a las necesidades individuales de cada usuario, MI1 ofrece una herramienta potente que
puede ser utilizada en diversas aplicaciones.

¡Ahora que tienes MI1 configurado, comienza a experimentar y adapta la IA a tus propias necesidades!
