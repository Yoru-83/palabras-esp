// console.log('Ejecutando script de actualización de consonantes...');

const PocketBase = require('pocketbase');

const pb = new PocketBase('https://yoru.pockethost.io');

async function obtenerPalabraConsonantes() {
    const url = 'https://raw.githubusercontent.com/Yoru-83/palabras-esp/main/lista-de-todas-las-palabras-en-espa%C3%B1ol.json';

    try {
        console.log('Obteniendo lista de palabras desde:', url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const palabras = await response.json();
        console.log('Lista de palabras obtenida con éxito.');

        // Función para contar las consonantes en una palabra
        function contarConsonantes(palabra) {
            return palabra.replace(/[aeiouáéíóúü]/gi, '').length;
        }

        // Filtrar palabras que tengan al menos 3 consonantes
        const palabrasConMinimo3Consonantes = palabras.filter(palabra => contarConsonantes(palabra) >= 3);

        if (palabrasConMinimo3Consonantes.length === 0) {
            throw new Error('No se encontraron palabras con al menos 3 consonantes.');
        }

        // Seleccionar una palabra aleatoria de las filtradas
        const palabraSeleccionada = palabrasConMinimo3Consonantes[Math.floor(Math.random() * palabrasConMinimo3Consonantes.length)];
        console.log('Palabra seleccionada:', palabraSeleccionada);

        // Extraer consonantes en orden de la palabra seleccionada
        const consonantes = palabraSeleccionada.match(/[^aeiouáéíóúü]/gi) || [];

        // Seleccionar solo tres consonantes en orden
        const [letra1, letra2, letra3] = consonantes.slice(0, 3);

        // example update data
        const data = {
            "letra1": letra1,
            "letra2": letra2,
            "letra3": letra3
        };

        //console.log('Datos a actualizar:', data);
        
        const record = await pb.collection('PLetras').update('f7atnxe9b4qb3iq', data);
        //console.log('Actualización exitosa:', record);

    } catch (error) {
        console.error('Error durante el proceso:', error.message);
    }
}

obtenerPalabraConsonantes();

