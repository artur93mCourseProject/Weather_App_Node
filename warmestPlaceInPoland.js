import fetch from 'node-fetch';

const processWeatherData = async data => {
    const sorted = [...data].sort((a, b) => {
        if (Number(b.temperatura) > Number(a.temperatura)) {
            return 1
        }
        if (Number(b.temperatura) < Number(a.temperatura)) {
            return -1;
        }

        return 0;
    });

    console.log('Warmest: ' + sorted[0].stacja);
    console.log('Coldest '+ sorted[sorted.length - 1].stacja);

    console.log(sorted.forEach(a => console.log(`${a.stacja} : ${a.temperatura}`)))

};

const findWarmestPlaceInPoland = async () => {
    try {
        const res = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
        const data = await res.json();
        await processWeatherData(data)
    } catch (error){
        console.log('Error has occurred :(', error)
    }
}

findWarmestPlaceInPoland();


