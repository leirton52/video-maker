const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithimia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content){
	await fetchContentFromWiki(content)
	sanitizeContent(content)
	breakContentIntoSentences(content)

	async function fetchContentFromWiki(content){
		const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
		const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2")
		const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
		const wikipediaContent = wikipediaResponde.get()

		content.sourceContentOriginal = wikipediaContent.content
	}

	function sanitizeContent(content){
		const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
		const withoutDateInParenteses = removeDateInParenteses(withoutBlankLinesAndMarkdown)

		content.sourceContentSanitized = withoutDateInParenteses

		function removeBlankLinesAndMarkdown(text){

			//cria um vetor onde cada linha do texto da wikipedia e um arqumento.
			const alllines = text.split('\n')
			//filtra as linhas em branco e os markdowns
			const withoutBlankLinesAndMarkdown = alllines.filter((line) => {
				if (line.trim().length === 0 || line.trim().startsWith('=')){
					return false
				}

				return true
			} )
			
			//retorna o texto filtrado como uma única string
			return withoutBlankLinesAndMarkdown.join('')
		}

		function removeDateInParenteses(text){
			return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
		}
	}

	function breakContentIntoSentences(content){
		content.sentences = []

		const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
		
		sentences.forEach((sentence) => {
			content.sentences.push({
				text: sentence,
				keywords: [],
				images: [],
			})
		})
	}
}

module.exports = robot
