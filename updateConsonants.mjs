import PocketBase from 'pocketbase';

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

        // Seleccionar solo tres consonantes en orden y convertirlas a mayúsculas
        const [letra1, letra2, letra3] = consonantes.slice(0, 3).map(letra => letra.toUpperCase());

        ////////////////////////////////////////////////////////////////////////////////////////////////// ACTUALIZO LA BASE DE DATOS CON TRES CONSONANTES SELECCIONADAS
        const data = {
            "letra1": letra1,
            "letra2": letra2,
            "letra3": letra3
        };

        console.log('Datos a actualizar:', data);
        
        const record = await pb.collection('PLetras').update('f7atnxe9b4qb3iq', data);
        console.log('Actualización exitosa:', record);

        ////////////////////////////////////////////////////////////////////////////////////////////////// RECOJO TODOS LOS IDS QUE HAY EN LA TABLA PClasificacionDia PARA LUEGO BORRARLOS YA QUE NO HAY UNA FORMA DE BORRAR TODO EL CONTENIDO DE LA TABLA DE FORMA DIRECTA
        const records = await pb.collection('PClasificacionDia').getFullList({
            sort: '-created',
        });

        // Eliminar cada registro por su ID
        for (const record of records) {
            await pb.collection('PClasificacionDia').delete(record.id);
            console.log(`Registro con ID ${record.id} eliminado.`);
        }

        console.log('Todos los registros han sido eliminados.');

    } catch (error) {
        console.error('Error durante el proceso:', error.message);
    }
}

obtenerPalabraConsonantes();


