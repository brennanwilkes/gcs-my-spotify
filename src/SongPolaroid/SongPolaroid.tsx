import {Song} from '../types/song';
import React from "react";

import "./songPolaroid.css";
import "./responsiveHeaders.css";

interface IProps {
	style?: React.CSSProperties
	song: Song,
	keyExtension?: string,
	onClick?: (song: Song) => void,
	isHoverable?: boolean,
	isDeletable?: boolean,
	isSelectable?: boolean,
	selected?: boolean,
	cutoff?: number
}
interface IState {
	key: string
}

/* tslint:disable:max-classes-per-file */
export class SongPolaroid extends React.Component<IProps, IState> {

	constructor(props: IProps){
		super(props);

		this.state = {
			key: this.props.song.id ?? `${this.props.song.spotifyId}:${this.props.song.youtubeId}:${this.props.song.musicKitId}` + this.props.keyExtension ?? ""
		}
	}

	render(){


		const title = this.props.cutoff ? this.props.song.title.slice(0,this.props.cutoff) + (this.props.song.title.length > this.props.cutoff ? "..." : "") : this.props.song.title;
		const artist = this.props.cutoff ? this.props.song.artist.slice(0,this.props.cutoff) + (this.props.song.artist.length > this.props.cutoff ? "..." : "") : this.props.song.artist;

		return <>
			<div
				className={
					`songPolaroid${this.props.isHoverable ? " songPolaroidHoverable" : ""}${this.props.isDeletable ? " songPolaroidDeletable" : ""}${this.props.isSelectable ? " songPolaroidSelectable" : ""}${this.props.selected ? " songPolaroidSelected" : ""}`
				}
				onClick={() => {
					if(this.props.onClick){
						this.props.onClick(this.props.song);
					}
				}} >
				<div>
					<div>
						<img src={this.props.song.thumbnailUrl}/>
					</div>
					<div className="p-2">
						<h4 className="rh4 m-n1">{title}</h4>
						<h5 className="rh5 m-n1">{artist}</h5>
					</div>
				</div>
			</div>
		</>
	}
}

interface WrappedIProps extends IProps{
	className?: string,
	style?: React.CSSProperties
}
export class WrappedSongPolaroid extends React.Component<WrappedIProps, {}> {
	render(){
		return <>
			<div style={this.props.style} className={`p-2 ${this.props.className ?? ""}`}>
				<SongPolaroid
					song={this.props.song}
					keyExtension={this.props.keyExtension}
					onClick={this.props.onClick}
					isHoverable={this.props.isHoverable}
					isDeletable={this.props.isDeletable}
					isSelectable={this.props.isSelectable}
					cutoff={this.props.cutoff}
					selected={this.props.selected} />
			</div>
		</>
	}
}
