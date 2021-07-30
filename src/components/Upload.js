import { postfiles } from "../api";
import React from 'react';

class Upload extends React.Component {
  state = {
			fileNames: [],
      selectedFiles: null,
			oneFile: null,
	};

	setFileState = e => {
		const files = e.target.files;
		let names = [];
		for (let i = 0; i < files.length; i++) {
			names.push(files[i].name); 
			console.log(names);
		}
	  this.setState({ 
			fileNames: names,
      selectedFiles: e.target.files,
			oneFile: e.target.files[0].text
    });
	};

	onFileUpload = async (e) => {
		e.preventDefault();
		const { selectedFiles } = this.state;
		const data = new FormData();
			data.append("files", selectedFiles);
				const config = {
					headers: {
						'content-type': 'multipart/form-data'
					}
				}
				console.log(data)
		const response = await postfiles(data, config);
			console.log(response);
	}

	renderFileData = () => {	
		const { fileNames, selectedFiles } = this.state;
		if ( selectedFiles ) {
			return (
			<div>
				<h4>File Names:</h4>
				<ul>
					{fileNames.map((name, index) => {
						return (
							<li key={index}>{name}</li>
						)
					})}
				</ul>
			</div>
				);} else {
				return (
				<div className="instructions">
					<br />
					<h4>Instructions:</h4>
					<ol>
						<li>Select .eml files</li>
						<li>Click send to extract email information</li>
					</ol>
				</div>
				);
			}
};
	
	render() {
	return (
		<div>
			<h1>.EML XP</h1>
			<h4>view contents of .eml files in bulk without opening them</h4>
				<form>
					<label htmlFor="file">Upload Files:</label>
					<input type="file" name="file" id="file" 
						multiple onChange={this.setFileState} /> 
					<button onClick={this.onFileUpload}> Send </button> 
				</form>
			{this.renderFileData()}
		</div>
	);
	}
}

export default Upload;