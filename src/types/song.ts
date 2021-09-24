
export interface Song{
	title: string,
	artist: string,
	album: string,
	duration: number,
	explicit: boolean,
	spotifyId: string,
	artistSpotifyId: string,
	albumSpotifyId: string,
	youtubeId?: string,
	musicKitId?: string,
	audioId?: string,
	id?: string,
	tags: string[],
	thumbnailUrl: string,
	releaseDate: string
}
export interface SongWithId extends Song{
	id: string
}



export class SongObj implements Song {
	title: string;
	artist: string;
	album: string;
	duration: number;
	explicit: boolean;
	spotifyId: string;
	artistSpotifyId: string;
	albumSpotifyId: string;
	youtubeId?: string;
	musicKitId?: string;
	audioId?: string;
	id?:string;
	tags: string[];
	thumbnailUrl: string;
	releaseDate: string;
	constructor (
		title: string,
		artist: string,
		album: string,
		duration: number,
		explicit: boolean,
		spotifyId: string,
		artistSpotifyId: string,
		albumSpotifyId: string,
		ids: {
			youtubeId?: string,
			musicKitId?: string,
		},
		tags: string[],
		thumbnailUrl: string,
		releaseDate: string,
		audioId?: string,
		id?: string
	) {
		this.title = title;
		this.artist = artist;
		this.album = album;
		this.duration = duration;
		this.explicit = explicit;
		this.spotifyId = spotifyId;
		this.artistSpotifyId = artistSpotifyId;
		this.albumSpotifyId = albumSpotifyId;
		this.youtubeId = ids.youtubeId;
		this.musicKitId = ids.musicKitId;
		this.tags = tags;
		this.thumbnailUrl = thumbnailUrl;
		this.releaseDate = releaseDate;
		if (audioId) this.audioId = audioId;
		if (id) this.id = id;
	}
}
