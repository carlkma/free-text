/*
    This file contains helper functions to identify the six major syntax errors in Python
    
    Details of the six issues are at: https://github.com/macarl08/free-text/issues

*/
import { python_stdilb } from "./python_stdlib";

function cleanLine(line: string) : string {
    line = line.split("#")[0]; // remove in-line comments, if any
    line = line.trimEnd(); // remove trailing whitespace
    return line;
}

function checkMissingColon(line: string) : number {
    /*
    something
    */

    line = cleanLine(line);
    var keyword = line.split(/\s+/)[0];
    var compound_statements = ["if", "while", "for", "try", "with", "match", "def", "class"];
    
    if (compound_statements.includes(keyword)){
        if (line.endsWith(":")) return -1;
        else return line.length
    }

    return -1;

}


function find_misplaced_colon(line: string) {
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

    var keyword = line.split(/\s+/)[0];
    var compound_statements = ["if", "while", "for", "try", "with", "match", "def", "class"];
    
    if (compound_statements.includes(keyword) && index == line.length - 1) return -1;
    else return index;
}

function checkParenthesis(line: string) {
    line = cleanLine(line);

    var counter = 0;
    for (var i=0; i<line.length; i++){
        if (line.charAt(i) == '(') counter++;
        if (line.charAt(i) == ')') counter--;
        if (counter<0) return i;
    }
    if (counter>0) return line.length;
    return -1
}

function checkImportStatement(line: string) {
    line = cleanLine(line);

    // three cases:
    // 1. import math
    // 2. import math as ma
    // 3. from math import pi

    if (line.includes("import")){
        var line_arr = line.split(/\s+/);
        
        if (line_arr.length == 2 || line_arr.length == 4){
            // cannot find
            if (python_stdilb.indexOf(line_arr[1]) === -1) return line.indexOf(line_arr[1]);
            
            if (line_arr.length == 2) return -1;
        
            if (line_arr.length == 4 && (line_arr[0] == "from" || line_arr[2] == "as")) return -1
        
        }
        return line.indexOf("import") // there is something wrong with this import statement
    }
    return -1
}

function checkIndentation(everything: string) {
    // something
}
