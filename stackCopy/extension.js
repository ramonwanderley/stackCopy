// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var stringsCopieds = [];

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "stackCopy" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed
        //vscode.window.showInformationMessage();
        var activeText = vscode.window.activeTextEditor;
        
 
        var result = activeText.document.getText(activeText.selection);
        stringsCopieds.push(result);
        // Display a message box to the user
        vscode.window.showInformationMessage( result);
    });
    let copy = vscode.commands.registerCommand('extension.copy', function () {
        // The code you place here will be executed every time your command is executed
        //vscode.window.showInformationMessage();
        var activeText = vscode.window.activeTextEditor;
        var result = activeText.document.getText(activeText.selection);
        
        //console.log( result._documentData._lines[0]);
        // Display a message box to the user
        stringsCopieds.push(result);
       
        vscode.window.showInformationMessage( result);
    });
    let paste = vscode.commands.registerCommand('extension.paste', function () {
        var result = stringsCopieds.pop();
        var activeText = vscode.window.activeTextEditor;
       // console.log();
        //activeText.document.insert(activeText.selection.start , result);
       // activeText.document.text(result);
       activeText.edit(editBuilder => {
        editBuilder.insert(/*new vscode.Range(0,0,1,0)*/activeText.selection.start, result);
    });
        vscode.window.showInformationMessage(result);
    });
    context.subscriptions.push(paste);
    context.subscriptions.push(copy);
    context.subscriptions.push(disposable);
    
    
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;