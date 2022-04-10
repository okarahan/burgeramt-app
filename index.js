const axios = require('axios')
const puppeteer = require('puppeteer');
const player = require('play-sound')();

let url = "https://service.berlin.de/terminvereinbarung/termin/tag.php?termin=1&anliegen[]=324280&dienstleisterlist=122210,122217,122219,122227,122231,122243,122252,122260,122262,122254,122271,122273,122277,122280,122282,122284,122291,122285,122286,122296,150230,122301,122297,122294,122312,122314,122304,122311,122309,122281,122279,122276,122274,122267,122246,122251,122257,122208,122226&herkunft=http%3A%2F%2Fservice.berlin.de%2Fdienstleistung%2F324280%2F"


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {

    console.log("searching...");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    appointments = await page.evaluate(() => {
        bookable_elements = document.querySelectorAll("td.buchbar a");
        // .getAttribute("href")
        bookable_array = Array.from(bookable_elements);
        return bookable_array.map(appointment => appointment.textContent);
      });

    if(appointments.length > 0) {

        console.log(appointments);
        player.play('./media/notification_sound.mp3', (err) => {
            if (err) console.log(`Could not play sound: ${err}`);
        });
        await sleep(30000);
    } else {
        console.log("No appointments found!")
    }

    await browser.close();
  }


book = async () => {
    console.log("booking...");

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    next_link = await page.evaluate(() => {
        n_link = document.querySelector("th.next a");
        console.log(n_link.getAttribute("href"));

        return n_link;
    });


    console.log(next_link.getAttribute("href"));
    

}

booking_options = {
    options : [
        {
            "date": "2022-01-03",

        }
    ]
}

appointment = {
    "service_id": 324280, // eat uebertragen
}


loop = async () => {
    while(true) {
        main();
        await sleep(5000);
    }
    
}

loop();
// book();