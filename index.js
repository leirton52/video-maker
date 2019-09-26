const readline = require('readline-sync')

function start(){
	const content = {}

	content.searchterm = askAndReturnSearchTerm()
	content.prefix = askAndReturnPrefix()

	function askAndReturnSearchTerm(){
		return readline.question('Termo para pesquisar na Wiki: ')
	}

	function askAndReturnPrefix(){
		const prefixes = ['Whois', 'What is', 'The history of' ]
		const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção')
		const selectedPrefixText = prefixes[selectedPrefixIndex]

		return selectedPrefixText
	}

	console.log(content)
}

start() 
