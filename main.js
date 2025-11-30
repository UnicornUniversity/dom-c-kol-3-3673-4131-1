//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application.
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */

// Výběr náhodný

const maleNames = [
    "Jan","Petr","Tomáš","Lukáš","Jakub","Martin","Michal","David","Josef","Jiří",
    "Karel","Marek","Ondřej","Václav","Filip","Daniel","Roman","Jaroslav","Adam","Matěj",
    "Štěpán","Vojtěch","Radek","Antonín","Aleš","Zdeněk","Patrik","Ladislav","Dominik","Richard",
    "Robert","Stanislav","Bohumil","Rudolf","Emil","Vladimír","Oliver","Libor","Ivo",
    "Pavel","František","Hynek","Albert","Eduard","Erik","Igor","Sebastian","Boris","Samuel"
];

const maleSurnames = [
    "Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec",
    "Marek","Pospíšil","Pokorný","Hájek","Král","Jelínek","Růžička","Beneš","Fiala","Sedláček",
    "Doležal","Zeman","Kolář","Navrátil","Čermák","Urban","Vaněk","Kříž","Krejčí","Malý",
    "Konečný","Bláha","Šimek","Kovář","Bartoš","Vlček","Polák","Kováč","Musil","Štěpánek",
    "Holub","Šťastný","Moravec","Kratochvíl","Tichý","Beránek","Kadlec","Matoušek","Hlaváček","Suchý"
];

const femaleNames = [
    "Marie","Jana","Eva","Anna","Lucie","Tereza","Kristýna","Veronika","Markéta","Kateřina",
    "Petra","Karolína","Barbora","Monika","Adéla","Lenka","Alena","Hana","Klára","Eliška",
    "Nikola","Martina","Simona","Zuzana","Michaela","Gabriela","Radka","Andrea","Blanka","Šárka",
    "Iveta","Denisa","Nela","Sofie","Kamila","Linda","Renata","Dominika","Silvie",
    "Věra","Božena","Dagmar","Vendula","Sabina","Magdaléna","Irena","Viktorie","Stela","Laura"
];

const femaleSurnames = [
    "Nováková","Svobodová","Novotná","Dvořáková","Černá","Procházková","Kučerová","Veselá","Horáková","Němcová",
    "Marková","Pospíšilová","Pokorná","Hájková","Králová","Jelínková","Růžičková","Benešová","Fialová","Sedláčková",
    "Doležalová","Zemanová","Kolářová","Navrátilová","Čermáková","Urbanová","Vaňková","Křížová","Krejčová","Malá",
    "Konečná","Bláhová","Šimková","Kovářová","Bartošová","Vlčková","Poláková","Kováčová","Musilová","Štěpánková",
    "Holubová","Šťastná","Moravcová","Kratochvílová","Tichá","Beránková","Kadlecová","Matoušková","Hlaváčková","Suchá"
];

// Funkce

/**
 * Vrátí náhodné celé číslo v intervalu <min, max>.
 * @param {number} min - Dolní hranice intervalu.
 * @param {number} max - Horní hranice intervalu.
 * @returns {number} Náhodné celé číslo.
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Vrátí náhodný prvek z pole.
 * @param {Array} arr - Pole hodnot.
 * @returns {*} Náhodný prvek z pole.
 */
function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Vygeneruje náhodné datum narození tak, aby věk spadal do intervalu <minAge, maxAge>.
 * @param {number} minAge - Minimální věk.
 * @param {number} maxAge - Maximální věk.
 * @returns {string} Datum narození ve formátu ISO.
 */
function randomBirthdate(minAge, maxAge) {
    const now = new Date();
    const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;

    const maxDate = new Date(now.getTime() - minAge * YEAR_MS);
    const minDate = new Date(now.getTime() - maxAge * YEAR_MS);

    const randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
    return new Date(randomTime).toISOString();
}

/**
 * Spočítá věk na základě data narození.
 * @param {string} birthdate - Datum narození ve formátu ISO.
 * @returns {number} Věk v letech.
 */
function calculateAge(birthdate) {
    const now = new Date();
    const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;
    const diffMs = now.getTime() - new Date(birthdate).getTime();
    return diffMs / YEAR_MS;
}

/**
 * Vygeneruje pole zaměstnanců s náhodnými daty.
 * @param {number} minAge - Minimální věk zaměstnance.
 * @param {number} maxAge - Maximální věk zaměstnance.
 * @param {number} totalCount - Počet zaměstnanců.
 * @returns {Array<object>} Pole zaměstnanců.
 */
function generateEmployees(minAge, maxAge, totalCount) {
    const output = [];
    const workloads = [10, 20, 30, 40];

    for (let i = 0; i < totalCount; i++) {
        const gender = randomFromArray(["male", "female"]);
        const name = gender === "male" ? randomFromArray(maleNames) : randomFromArray(femaleNames);
        const surname = gender === "male" ? randomFromArray(maleSurnames) : randomFromArray(femaleSurnames);

        const birthdate = randomBirthdate(minAge, maxAge);
        const age = calculateAge(birthdate);

        const workload = workloads[randomInt(0, workloads.length - 1)];

        if (age < minAge || age > maxAge) {
            throw new Error("Vygenerovaný věk je mimo interval!");
        }

        output.push({ gender, name, surname, birthdate, age, workload });
    }

    return output;
}

/**
 * Vstupní bod aplikace.
 * @param {object} dtoIn - vstupní data
 * @param {number} dtoIn.count - počet zaměstnanců
 * @param {object} dtoIn.age - věkové limity
 * @param {number} dtoIn.age.min - minimální věk
 * @param {number} dtoIn.age.max - maximální věk
 * @returns {Array<object>} pole zaměstnanců
 */
export function main(dtoIn) {
    const { count, age } = dtoIn;
    return generateEmployees(age.min, age.max, count);
}

// Příklad
const result = main({ count: 20, age: { min: 18, max: 65 } });
console.log(result);

