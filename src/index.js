// Typescript Tutorial
// to compile: tsc.cmd
// to run: node dist/index
// Basic Types
var a = "hello";
var b = 5;
var isGood = false;
var x = "now a string";
x = 10; // now a number
// array
var list_of_id;
list_of_id = [1, 2, 3, 4, 5];
var list_of_any = ["a string", 23, true];
// Tuple
var person = ["Bob", 18];
// Tuple array
var people;
people = [
    ["alice", 17],
    ["mike", 19],
    ["alpha", 18],
];
// union
var something;
something = "hey";
something = 100;
// enum
var Direction;
(function (Direction) {
    Direction["up"] = "up";
    Direction["down"] = "down";
})(Direction || (Direction = {}));
var user = {
    id: 100,
    name: "john"
};
console.log(a);
