const readline = require('readline-sync')
const robots = {
	text: require('./robots/text.js')
}

async function start(){
	const content = {}

	content.searchTerm = askAndReturnSearchTerm()
	content.prefix = askAndReturnPrefix()

	await robots.text(content)

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
