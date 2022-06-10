const json = require('./data.json');
const prompt = require('prompt-sync')({ sigint: true });
var fs = require('fs');

// let's avoid lodash :)

const data = JSON.parse(json);

// 1. Split the array into a tuple where the first element is those that have IdUser and the second is those objects where IdUser is null or undefined
//     We know that tuples in js are not available so you can use array of arrays [[], []]
//     1.1 In the first element elements should be only those which have valid Id field


const arrayWithUserIds = [];
const arrayWithoutUserIds = [];

// we will do one array mapping instead of 2 filters
for (let item of data) {
  !!item.IdUser ? arrayWithUserIds.push(item) : arrayWithoutUserIds.push(item);
}

const tuple = [[...arrayWithUserIds.filter(el => !!el.Id)], [...arrayWithoutUserIds]]

// 2. Group the first element of the tuple(array of arrays) by GroupName
//     Example: with a given array of [{ country: 'BG', name: 'Georgi' }, { country: 'BG', name: 'Emil' }, { country: 'GR', name: 'Stefanos' }, { country: 'US', name: 'Mark' }]
//     grouping by country expected result should be:
//     {
//      BG: [{ country: 'BG', name: 'Georgi' }, { country: 'BG', name: 'Emil' }],
//      GR: [{ country: 'GR', name: 'Stefanos' }],
//      US: [{ country: 'US', name: 'Mark' }]
//     }
//     2.1 For those which GroupName is undefined or null include them in General group

tuple[0] = tuple[0].reduce((acc, val) => {
  const { GroupName } = val;
  const defaultGroup = 'General';

  acc[GroupName || defaultGroup] = [...acc[GroupName || defaultGroup] || [], { ...val }];

  return acc;
}, {});


// 3. General group should be on the top
const generalGroup = [...tuple[0].General]
delete tuple[0].General;

tuple[0] = [{
  General: [...generalGroup],
  ...tuple[0]
}];

// 4. Print the result

console.log(tuple[0], '\n')

// 5. Get user input from standard input/output and the objects that Label contains the user's input.
// Move the result to the second element of the tuple (array of arrays)

const labelQuery = prompt('Which label are you looking for? 👉 ');

const labelResults = data.filter(el => el.Label && el.Label.toLowerCase().includes(labelQuery.toLowerCase()))

tuple[1].push(...labelResults);

console.log(`\n \n 👌 I have found ${labelResults.length} results based on the query "${labelQuery}" \n \n`)

// 6. Print the final result

console.log('\n The final tuple looks like that, ', tuple);

fs.writeFile('result.json', JSON.stringify(tuple), 'utf8', () => console.log('Please chech the result.json file!'));

// Notes:
// 1. In the repo we have reference to lodash library. Feel free to use it.
// ---- I dont need it, thanks :)

// Bonus:
// 1. Write your own logic for grouping the array
// --- I have used Array.reduce()

// 2. Write your own logic for splitting into tuples
// I have used my own logic for it actually

// 3. We like immutability. So bonus will be recieved if all the code is written in the immutiable manner.
// Well, then I need to avaid direct tuple[0] and tuple[1] injections, my goal was to mutate the original tuples array
