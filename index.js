import fetch from 'node-fetch';
import { appendFile } from 'fs/promises';
import { normalize, resolve} from 'path';


function safeJoin(base, target) {
    const targetPath = '.' + normalize('/' + target);
    return resolve(base, targetPath);
}

const getDataFileName = city => safeJoin(`./data/`, `${city}.txt`);

const processWeatherData = async (data, cityName) => {
    const foundData = data.find(stationData => stationData.stacja === cityName);

    if (!foundData) {
        throw new Erroe('There is no such city in our API :(')
    }

    const {
        cisnienie: pressure,
        wilgotnosc_wzgledna: humidity,
        temperatura: temperature
    } = foundData;

    const weatherInfo = `In ${cityName} there is ${temperature}C, ${humidity}% of humidity and pressure of ${pressure} hPa`;

    const dateTimeString = new Date().toLocaleString();
    await appendFile(getDataFileName(cityName), `${dateTimeString}\n${weatherInfo}\n`);
};

const checkCityWeather = async cityName => {
    try {
        const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
        const data = await res.json();
        await processWeatherData(data, cityName)
    } catch (error){
        console.log('Error has occurred :(', error)
    }
}

checkCityWeather(process.argv[2]);


