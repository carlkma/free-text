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

helperModule.test();
var model = editor.getModel();

var all = editor.getValue();
var line = model.getLineContent(1);
console.log(line)