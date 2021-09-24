import React from "react";
import {Song} from "../types/song";
import {WrappedSongPolaroid} from "../SongPolaroid/SongPolaroid";
import "./songDisplay.css";
import {spotifyCachedAuth, SpotifyToken, getTop} from "gcs-util";

interface IProps {
	songs: Song[],
	refresh: boolean
}
interface IState {
}

export class SongDisplay extends React.Component<IProps, IState> {

	constructor(props: IProps){
		super(props);

	}

	render(){
		return <>
			<div className="fluid-container row m-4 SongDisplay">{
				this.props.songs.map((s, i) => <WrappedSongPolaroid style={{
					animationDelay: this.props.refresh ? "0s" : `${Math.min(2, i * 0.25)}s` ,
					animationName: this.props.refresh ? "fadeout" : "fadein",
					animationDuration: this.props.refresh ? "0.25s" : "1s"
				}} className={`col-12 col-sm-6 col-md-4 col-lg-3 fadeIn fadeIn${i}`} key={s.id} song={s}/>)
			}</div>
		</>;
	}

}

interface IProps2 {
	options: {
		time_range: "short_term" | "medium_term" | "long_term",
		type: "tracks" | "artists"
	},
	callback: (ids: string[]) => void
}
interface IState2 {
	songs: Song[],
	refresh: boolean
}
export class SongDisplayFromOptions extends React.Component<IProps2, IState2> {
	constructor(props: IProps2){
		super(props);
		this.state = {
			songs: [],
			refresh: false
		}

		this.updateSongs = this.updateSongs.bind(this);
	}

	updateSongs(){
		this.setState({
			refresh: true
		}, () => {
			spotifyCachedAuth().then((auth: SpotifyToken) => {
				getTop({
					token: auth.access,
					time_range: this.props.options.time_range,
					type: "tracks"
				}).then((resp: any) => {
					this.setState({
						songs: resp.songs as Song[],
						refresh: false
					});
					this.props.callback((resp.songs as any[]).map(song => song.ids.filter((id: any) => id.label === "spotify")[0].id));
				}).catch(console.error);
			}).catch(console.error);
		});
	}

	componentDidMount(){
		this.updateSongs();
	}

	componentDidUpdate(prevProps: IProps2){
		if(prevProps.options.time_range !== this.props.options.time_range || prevProps.options.type !== this.props.options.type){
			this.updateSongs();
		}
	}

	render(){
		return <SongDisplay songs={this.state.songs} refresh={this.state.refresh} />
	}
}
