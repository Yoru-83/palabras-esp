//console.log('Ejecutando script de actualización de consonantes...');

async function obtenerPalabraConsonantes() {
    const url = 'https://raw.githubusercontent.com/Yoru-83/palabras-esp/main/lista-de-todas-las-palabras-en-espa%C3%B1ol.json';

    try {
        const response = await fetch(url);
        const palabras = await response.json();

        // Función para contar las consonantes en una palabra
        function contarConsonantes(palabra) {
            return palabra.replace(/[aeiouáéíóúü]/gi, '').length;
        }

        // Filtrar palabras que tengan al menos 3 consonantes
        const palabrasConMinimo3Consonantes = palabras.filter(palabra => contarConsonantes(palabra) >= 3);

        // Seleccionar una palabra aleatoria de las filtradas
        const palabraSeleccionada = palabrasConMinimo3Consonantes[Math.floor(Math.random() * palabrasConMinimo3Consonantes.length)];

        // Extraer consonantes en orden de la palabra seleccionada
        const consonantes = palabraSeleccionada.match(/[^aeiouáéíóúü]/gi);
        
        // Seleccionar solo tres consonantes en orden
        const tresConsonantes = consonantes.slice(0, 3).join('');

        console.log('Palabra seleccionada:', palabraSeleccionada);
        console.log('Tres consonantes:', tresConsonantes);

    } catch (error) {
        console.error('Error al obtener la lista de palabras:', error);
    }
}

obtenerPalabraConsonantes();
