const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 8000;
const { API_KEY, PROMPT_GENERATOR, AI_MODEL } = require('./CLASSIFIED');
const { GoogleGenAI } = require('@google/genai');

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const ai = new GoogleGenAI({ apiKey: API_KEY });

const languageCode = {
	ko: 'Korean',
	en: 'English',
	es: 'Spanish',
};

const queryCode = {
	lang1: 'language1',
	lang2: 'language2',
	st: 'sentence',
};

app.post('/translate', async (req, res) => {
	try {
		const { lang1, lang2, st } = req.query;

		if (!languageCode[lang1] && languageCode[lang2]) throw error('Invalid language code');

		const translatedSentence = await translateWithAI(languageCode[lang1], languageCode[lang2], decodeURIComponent(st));
		const translatedSentenceObject = Object.fromEntries(translatedSentence.split('||').map((part) => part.split(': ')));

		res.status(200).json(translatedSentenceObject);
	} catch (err) {
		console.error(err);
	}
});

async function translateWithAI(language1, language2, sentence) {
	const response = await ai.models.generateContent({
		model: AI_MODEL,
		contents: PROMPT_GENERATOR(language1, language2, sentence),
	});
	return response.text;
}
