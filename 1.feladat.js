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
    console.log(person.lastname+ ' '+person.streetname+' '+person.favenum);


};
