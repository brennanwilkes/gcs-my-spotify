import React from 'react';
import "./app.scss";
import "./scss/index.scss";
import {HrWrapper} from "./HrWrapper/HrWrapper";
import {SongDisplayFromOptions} from "./SongDisplay/SongDisplay";
import { createPlaylist, localStorageKey, spotifyCachedAuth, SpotifyToken } from 'gcs-util';

interface IProps{}
interface IState{
	time_range: "short_term" | "medium_term" | "long_term",
	type: "tracks" | "artists"
	disable: {
		short_term: boolean,
		medium_term: boolean,
		long_term: boolean
	}
	ids: string[],
	auth: boolean
}

export default class App extends React.Component<IProps, IState>{

	constructor(props: IProps){
		super(props);

		this.state = {
			time_range: "medium_term",
			type: "tracks",
			disable: {
				short_term: false,
				medium_term: false,
				long_term: false
			},
			ids: [],
			auth: false
		}
	}

	componentDidMount(){
		if(localStorage.getItem(localStorageKey)){
			this.setState({
				auth: true
			});
		}
	}

	render(){
		return (
			this.state.auth
			? <div className="App">
				<header>
					<h1 className="text-gcs-loud mb-0 pt-5 pt-md-0 mt-md-n4 rh1">GCS Spotify</h1>
					<nav>
						<div onClick={(e) => this.setState({time_range: "short_term"})} className={`text-gcs-${this.state.time_range === "short_term" ? "bright" : "faded"} mx-2 h3 my-0 p-2 mt-lg-5`}>
							<h3 className={`rh3 m-0`}>Four Weeks</h3>
						</div>
						<div onClick={(e) => this.setState({time_range: "medium_term"})} className={`text-gcs-${this.state.time_range === "medium_term" ? "bright" : "faded"} mx-2 h3 my-0 p-2 mt-lg-5`}>
							<h3 className={`rh3 m-0`}>Six Months</h3>
						</div>
						<div onClick={(e) => this.setState({time_range: "long_term"})} className={`text-gcs-${this.state.time_range === "long_term" ? "bright" : "faded"} mx-2 h3 my-0 p-2 mt-lg-5`}>
							<h3 className={`rh3 m-0`}>All Time</h3>
						</div>
					</nav>
				</header>
				<main>
					<div className="songDisplayWrapper">
						<HrWrapper style={{
							borderBottomColor: "#c8c1f5ff"
						}} children={<>
							<h2 className="text-gcs-faded" >{`Your Top ${this.state.type === "tracks" ? "Tracks" : "Artists"}`}</h2>
							<button
								disabled={this.state.disable[this.state.time_range]}
								className="btn btn-success"
								onClick={event => {
									spotifyCachedAuth().then((auth: SpotifyToken) => {
										return createPlaylist({
											description: `These are the ${this.state.type} which you have listened to the most ${this.state.time_range === "short_term" ? "over the past four weeks" : (this.state.time_range === "medium_term" ? "over the past six months" : "throughout your time listening to spotify")}`,
											name: `Top Tracks (${this.state.time_range === "short_term" ? "Four Weeks" : (this.state.time_range === "medium_term" ? "Six Months" : "All Time")})`,
											tracks: this.state.ids,
											token: auth.access
										});
									}).then(id => {
										const disable = this.state.disable;
										disable[this.state.time_range] = true;
										this.setState({
											disable
										});
									}).catch(console.error);
								}}
							>
								<div>
									<img src="./spotify.svg" />
									<span>Add to Spotify</span>
								</div>
							</button>
						</>} />
						<p className="mt-1 mt-md-3 text-gcs-alpine">
							These are the {this.state.type} which you've listened to the most {this.state.time_range === "short_term" ? "over the past four weeks" : (this.state.time_range === "medium_term" ? "over the past six months" : "throughout your time listening to spotify")}
						</p>

					</div>
					<div className="songDisplayWrapper">
						<SongDisplayFromOptions options={this.state} callback={(ids: string[]) => this.setState({
							ids
						})} />
					</div>
				</main>
			</div>
			: <div className="noAuth"><button
				className="btn btn-success"
				onClick={event => {
					spotifyCachedAuth().then((auth: SpotifyToken) => {
						this.setState({auth: true});
					}).catch(console.error);
				}}
			>
				<div>
					<img src="./spotify.svg" />
					<span>Login To Spotify</span>
				</div>
			</button></div>
		);
	}
}
