import express from 'express';
import fetch from 'node-fetch';
import { MUX_TOKEN_ID, MUX_TOKEN_SECRET, MUX_API_URI, IMAGEKIT_PRIVATE_TOKEN, IMAGEKIT_URI } from './CLASSIFIED.mjs';
const app = express();

async function fetchMUX() {
	const auth = Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString('base64');
	const response = await fetch(MUX_API_URI, {
		method: 'GET',
		headers: {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/json',
		},
	});
	return (await response.json()).data;
}

async function fetchImageKit() {
	const auth = Buffer.from(`${IMAGEKIT_PRIVATE_TOKEN}:`).toString('base64');
	const response = await fetch(IMAGEKIT_URI, {
		method: 'GET',
		headers: {
			Authorization: `Basic ${auth}`,
			'Content-Type': 'application/json',
		},
	});
	return await response.json();
}

async function fetchImageAndVideo() {
	const [videos, images] = await Promise.all([fetchMUX(), fetchImageKit()]);
	const mappedVideos = videos.map((d) => ({ type: 'video', url: d.playback_ids[0]['id'] }));
	const mappedImages = images.map((d) => ({ type: 'image', url: d.url, thumbnail: d.thumbnail }));
	const videosImagesInfo = [...mappedVideos, ...mappedImages];
	console.log(videosImagesInfo);
	return videosImagesInfo;
}

fetchImageAndVideo();
