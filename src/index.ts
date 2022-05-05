// Typescript Tutorial
// to compile: tsc.cmd
// to run: node dist/index

// Basic Types
let a:String = "hello"
let b:number = 5
let isGood:boolean = false
let x:any = "now a string"
x = 10 // now a number

// array
let list_of_id: number[]
list_of_id = [1,2,3,4,5]

let list_of_any: any[] = ["a string", 23, true]

// Tuple
let person: [string, number] = ["Bob", 18]

// Tuple array
let people: [string, number][]
people = [
    ["alice", 17],
    ["mike", 19],
    ["alpha", 18],
]


// union
let something: string | number
something = "hey"
something = 100

// enum
enum Direction {
    up = "up",
    down = "down"
}

//object
type User = {
    id: number
    name: string
}

const user: User = {
    id: 100,
    name: "john",
}

console.log(a)