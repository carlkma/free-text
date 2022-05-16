var fil = require("filbert");

const fs = require('fs');
var python_script;

var var_table = {};


fs.readFile('src/sample.py', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var ast = fil.parse(data);
  console.log(ast.body[0].declarations[0].init.arguments[0].arguments)
});

// input: a statement with an odd number of equal (assignment) sign

function checkAssignment(line){
  var single_ast_line = fil.parse(line);
  var info = single_ast_line.body[0].declarations[0];
  if (info.type == 'VariableDeclarator') {
    var var_name = info.id.name;
    var init_type = info.init.type;

    if (init_type=='Literal'){
      var init_value = info.init.value;
      init_type = typeof(init_value);
      var_table[var_name] = init_type;
    }
    if (init_type=='Identifier'){
      var init_var_name = info.init.name;
      if (var_table[init_var_name]) var_table[var_name] = var_table[init_var_name];
      else return -1
    }
    if (init_type=='CallExpression'){
      //something
    }
  }
}

function checkExpression(node){
  
  if (node.type == "CallExpression"){
    var lhs = checkExpression(node.arguments[0]);
    var rhs = checkExpression(node.arguments[1]);
    
  }
  if (node.type == "Literal"){
    var node_type = typeof(node.value);

  }
  if (node.type == "Identifier"){
    var node_type = var_table[node.name]
    if (!node_type) return -1
  }
}