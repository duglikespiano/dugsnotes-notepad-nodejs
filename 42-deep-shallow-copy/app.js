const person = {
	name: 'dug',
	age: 20,
	skills: ['Sleep, Eating, Playing games'],
};

const personCopy1 = { ...person };
const personCopy2 = JSON.parse(JSON.stringify(person));

console.log(person.skills === personCopy1.skills); // true, shallow copy
console.log(person.skills === personCopy2.skills); // false, deep copy
