import chalk from 'chalk';
import readline from 'readline/promises'

const API_KEY = '6c1c6aaa8b7a443cb07132910252704';
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})

const getWeather = async (city) => {
    const query = `${BASE_URL}?key=${API_KEY}&q=${city}`
    try {
        const response = await fetch(query);
        if(!response.ok){
            throw new Error('City Not Found. Please Check City Name')
        }
        const weatherData = await response.json()
        console.log(chalk.yellow('\nWeather Information : '))
        console.log('City : ',weatherData.location.name, ',',weatherData.location.country);
        console.log(chalk.bgRed("Temperature : ",weatherData.current.temp_c, '°C '), "");
        console.log('Weather Condition : ', weatherData.current.condition.text)
        console.log('Last Updated : ',weatherData.current.last_updated, '\n');
    } catch (error) {
        console.log('Error :', error)    
    }
}


const main = async () => {
    const city = await rl.question("\nEnter City Name to get Weather Update: ");
    await getWeather(city);
    rl.close();
};

main();
