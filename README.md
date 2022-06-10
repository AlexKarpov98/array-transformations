# Instructions:
## 1.npm install
## 2.node index.js

# Rules
## 1. Split the array into a tuple where the first element is those that have IdUser and the second is those objects where IdUser is null or undefined
##     We know that tuples in js are not available so you can use array of arrays [[], []]
##     1.1 In the first element elements should be only those which have valid Id field
## 2. Group the first element of the tuple(array of arrays) by GroupName
  ###     Example: with a given array of [{ country: 'BG', name: 'Georgi' }, { country: 'BG', name: 'Emil' }, { country: 'GR', name: 'Stefanos' }, { country: 'US', name: 'Mark' }]
  ###     grouping by country expected result should be:
  ###     {
  ###      BG: [{ country: 'BG', name: 'Georgi' }, { country: 'BG', name: 'Emil' }],
  ###      GR: [{ country: 'GR', name: 'Stefanos' }],
  ###      US: [{ country: 'US', name: 'Mark' }]
  ###     }
##     2.1 For those which GroupName is undefined or null include them in General group
## 3. General group should be on the top
## 4. Print the result
## 5. Get user input from standard input/output and the objects that Label contains the user's input. Move the result to the second element of the tuple (array of arrays)
## 6. Print the final result

## Notes:
## 1. In the repo we have reference to lodash library. Feel free to use it.

## Bonus:
## 1. Write your own logic for grouping the array
## 2. Write your own logic for splitting into tuples
