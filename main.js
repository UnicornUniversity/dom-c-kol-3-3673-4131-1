//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application.
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */

// Výběr

const maleNames = [
    "Jan","Petr","Tomáš","Lukáš","Jakub","Martin","Michal","David","Josef","Jiří",
    "Karel","Marek","Ondřej","Václav","Filip","Daniel","Roman","Jaroslav","Adam","Matěj",
    "Štěpán","Vojtěch","Radek","Antonín","Aleš","Zdeněk","Patrik","Ladislav","Dominik","Richard",
    "Robert","Stanislav","Bohumil","Rudolf","Emil","Vladimír","Oldřich","Libor","Ivo",
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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomBirthdate(minAge, maxAge) {
    const now = new Date();
    const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;

    const maxDate = new Date(now.getTime() - minAge * YEAR_MS);
    const minDate = new Date(now.getTime() - maxAge * YEAR_MS);

    const randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
    return new Date(randomTime).toISOString();
}

function calculateAge(birthdate) {
    const now = new Date();
    const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;
    const diffMs = now.getTime() - new Date(birthdate).getTime();
    return diffMs / YEAR_MS;
}

// Generátor

function generateEmployees(minAge, maxAge, totalCount) {
    const output = [];
    const workloads = [10, 20, 30, 40];

    for (let i = 0; i < totalCount; i++) {
        const gender = randomFromArray(["male", "female"]);

        const name = gender === "male" ? randomFromArray(maleNames) : randomFromArray(femaleNames);
        const surname = gender === "male" ? randomFromArray(maleSurnames) : randomFromArray(femaleSurnames);

        const birthdate = randomBirthdate(minAge, maxAge);
        const age = calculateAge(birthdate);
        const workload = randomFromArray(workloads);


        if (age < minAge || age > maxAge) {
            throw new Error("Vygenerovaný věk je mimo interval!");
        }

        output.push({ gender, birthdate, age, name, surname, workload });
    }

    return output;
}

// Main
/**
 * Vstupní bod aplikace.
 * Generuje pole zaměstnanců s náhodnými daty tak,
 * aby věk byl přísně v intervalu <min, max>.
 *
 * @param {object} dtoIn - vstupní data
 * @param {number} dtoIn.count - počet zaměstnanců
 * @param {object} dtoIn.age - věkové limity
 * @param {number} dtoIn.age.min - minimální věk (včetně)
 * @param {number} dtoIn.age.max - maximální věk (včetně)
 * @returns {Array} pole zaměstnanců
 */
export function main(dtoIn) {
    const { count, age } = dtoIn;
    return generateEmployees(age.min, age.max, count);
}

// Příklad

const result = main({ count: 20, age: { min: 18, max: 65 } });
console.log(result);