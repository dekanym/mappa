let people = [];

document.getElementById('saveData').onclick = () => {
    const person = {
        lastname: document.getElementById('lastname').value,
        streetname: document.getElementById('streetname').value,
        favenum: document.getElementById('favenum').value,
        hasLicense: document.getElementById('hasLicense').value
    };

    people.push(person);
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById('hasLicense').value = 'yes';

};
document.getElementById('showWithLicense').onclick = () => {
    const result = document.getElementById('result');
    result.innerHTML = '';
    people.forEach(person => {
        if (person.hasLicense === 'yes') {
            result.innerHTML += person.lastname + ' ' + person.streetname + ' ' + person.favenum + '<br>';
            console.log(person.lastname+ ' '+person.streetname+' '+person.favenum);

        };
    });
};
document.getElementById('showWithoutLicense').onclick = () => {
    const result = document.getElementById('result');
    result.innerHTML = '';
    people.forEach(person => {
        if (person.hasLicense === 'no') {
            result.innerHTML +=person.lastname+ ' '+person.streetname+' '+person.favenum+'<br>';
            console.log(person.lastname+ ' '+person.streetname+' '+person.favenum);

        };
    });
};
