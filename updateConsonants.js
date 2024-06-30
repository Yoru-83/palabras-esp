import PocketBase from 'pocketbase';

const pb = new PocketBase('https://yoru.pockethost.io');

function getRandomConsonant() {
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    return consonants.charAt(Math.floor(Math.random() * consonants.length));
}

const consonante1 = getRandomConsonant();
const consonante2 = getRandomConsonant();
const consonante3 = getRandomConsonant();

const data = {
    "letra1": consonante1,
    "letra2": consonante2,
    "letra3": consonante3
};

async function updateConsonants() {
    try {
        const recordId = 'RECORD_ID'; // Reemplaza esto con el ID del registro que deseas actualizar
        const record = await pb.collection('PLetras').update(recordId, data);
        console.log('Success:', record);
    } catch (error) {
        console.error('Error:', error);
    }
}

updateConsonants();
