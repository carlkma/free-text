"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    This file contains helper functions to identify the six major syntax errors in Python
    
    Details of the six issues are at: https://github.com/macarl08/free-text/issues

*/
const python_stdlib_1 = require("./python_stdlib");
var compound_statements = ["if", "while", "for", "try", "with", "match", "def", "class"];
function cleanLine(line) {
    line = line.split("#")[0]; // remove in-line comments, if any
    line = line.trimEnd(); // remove trailing whitespace
    return line;
}
function hasKeyword(line) {
    var keyword = line.trimStart().split(/\s+/)[0];
    return compound_statements.includes(keyword);
}
function checkMissingColon(line) {
    /*
    something
    */
    line = cleanLine(line);
    if (hasKeyword(line)) {
        if (line.endsWith(":"))
            return -1;
        else
            return line.length;
    }
    return -1;
}
function find_misplaced_colon(line) {
    line = cleanLine(line);
    // replace all : in "" with placeholder @
    line = line.replace(/"[^"]+"/g, match => match.replace(/:/g, '@'));
    // replace all : in '' with placeholder @
    line = line.replace(/'[^']+'/g, match => match.replace(/:/g, '@'));
    // replace all : in [] with placeholder @
    line = line.replace(/\[[^\]]+\]/g, match => match.replace(/:/g, '@'));
    // replace all : in {} with placeholder @
    line = line.replace(/\{[^\}]+\}/g, match => match.replace(/:/g, '@'));
    // return first occurance of left-behind ':'
    var index = line.search(":");
    if (hasKeyword(line) && index == line.length - 1)
        return -1;
    else
        return index;
}
function checkParenthesis(line) {
    line = cleanLine(line);
    var counter = 0;
    for (var i = 0; i < line.length; i++) {
        if (line.charAt(i) == '(')
            counter++;
        if (line.charAt(i) == ')')
            counter--;
        if (counter < 0)
            return i;
    }
    if (counter > 0)
        return line.length;
    return -1;
}
function checkImportStatement(line) {
    line = cleanLine(line);
    // three cases:
    // 1. import math
    // 2. import math as ma
    // 3. from math import pi
    if (line.includes("import")) {
        var line_arr = line.split(/\s+/);
        if (line_arr.length == 2 || line_arr.length == 4) {
            // cannot find
            if (python_stdlib_1.python_stdilb.indexOf(line_arr[1]) === -1)
                return line.indexOf(line_arr[1]);
            if (line_arr.length == 2)
                return -1;
            if (line_arr.length == 4 && (line_arr[0] == "from" || line_arr[2] == "as"))
                return -1;
        }
        return line.indexOf("import"); // there is something wrong with this import statement
    }
    return -1;
}
function checkIndentation(entire_code) {
    // something
    var current_indentation = 0, next_indentation = 0, diff = 0;
    var entire_code_arr = entire_code.split('\n');
    if (entire_code_arr.length < 2)
        return -1;
    for (var i = 0; i < entire_code_arr.length; i++) {
        current_indentation = entire_code_arr[i].search(/\S|$/);
        diff = next_indentation - current_indentation;
        if (diff < 0)
            return i + 1;
        if (hasKeyword(entire_code_arr[i]))
            next_indentation = current_indentation + 1;
        console.log(current_indentation, next_indentation);
    }
    return -1;
}
var testing = `for i in range():
\tasdf;
\tasdf;
while i in range
\tif i:
\t\tasdf
return a;
`;
console.log(checkIndentation(testing));
