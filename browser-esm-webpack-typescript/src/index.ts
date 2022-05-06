import * as monaco from 'monaco-editor';
import './index.css';
import * as helperModule from './helper';

// npm run build

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

var editor = monaco.editor.create(document.body, {
	value: ['def hello():', '\tprint("Hello World")', ''].join('\n'),
	language: 'python'
});
var model = editor.getModel();

model.onDidChangeContent((event) => {
	
	var this_line = model.getLineContent(editor.getPosition().lineNumber)
	
	var out = helperModule.checkParenthesis(this_line);
	console.log(out);
  });

var everything = editor.getValue();
var single_line = model.getLineContent(1);
console.log(single_line)