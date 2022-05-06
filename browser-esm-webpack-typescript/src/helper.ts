/*
    Temp doc
    Note that the keyword export is not used here
    This is for debugging purposes
    to be updated
*/

function cleanLine(line: string) : string {
    line = line.split("#")[0]; // remove in-line comments, if any
    line = line.trimEnd(); // remove trailing whitespace
    return line;
}

function checkMissingColon(line: string) : number {
    /*
    Corresponds to Issue #1: Identify missing colon
    */

    line = cleanLine(line)

    // define keywords
    var compound_statements = ["if", "while", "for", "try", "with", "match", "def", "class"];
    
    // define boolean that tests if line includes any of the keywords
    var hasKeyword = compound_statements.some(v => line.includes(v));

    
    if (hasKeyword){ // if hasKeyword is true
        if (line.endsWith(":")) return -1;
        return line.length
    }
    return -1;

    // console.log(checkMissingColon("for i in range(10):"));
}


function find_misplaced_colon(line: string) {
    line = cleanLine(line);
    line = line.replace(/\"(.*?)\"/g,"");
    line = line.replace(/\'(.*?)\'/g,"");
    line = line.replace(/\[(.*?)\]/g,"");
    line = line.replace(/\{(.*?)\}/g,"");

    var compound_statements = ["if", "while", "for", "try", "with", "match", "def", "class"];
    var hasKeyword = compound_statements.some(v => line.includes(v));
    if (hasKeyword && line.endsWith(":")) line = line.slice(0, -1);
    
    if (line.search(":") == -1) return false;
    else return true;
    // this only returns t/f, not the index
    // to be enhanced
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
    if (line.includes("import")){
        var line_arr = line.split(" ");
        if (line_arr[0] == "import"){
            return;
        }
    }
}

function checkIndentation(everything: string) {
    // something
}
