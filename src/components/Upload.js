import { postfiles } from "../api";
import React from 'react';

class Upload extends React.Component {
  state = {
			fileNames: [],
      selectedFiles: null,
			field_name: ''
	};

	setFileData = e => {
		const files = e.target.files;
		let names = [];
		for (let i = 0; i < files.length; i++) {
			names.push(files[i].name); 
			console.log(names);
		}
	  this.setState({ 
			fileNames: names,
      selectedFiles: files
		});
	};

	setFieldName = e => {
		const input = e.target.field_name;
		let names = [];
	  this.setState({ 
      field_name: input
		});
	};

	onFileUpload = async (e) => {
		e.preventDefault();
		const { field_name, selectedFiles } = this.state;
		const formData = new FormData();
			for (const file of selectedFiles ) {
				formData.append(field_name, file);
			}
				const config = {
					headers: {
						'content-type': 'multipart/form-data'
					}
				}
				console.log("files sent to server", formData)
		const response = await postfiles(formData, config);
		console.log(response.data);
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
						<li>Name bulk (date_lastname format: 210731_shin)</li>
						<li>Select .eml files (max 10 files)</li>
						<li>Click send to extract email information</li>
					</ol>
				</div>
				);
			}
};
	
	render() {
	return (
		<div>
			<h1>Sm@il</h1> 
			<h4>view contents of bulk .eml files without opening them</h4>
				<form>
					<label>Field Name</label>
						<input type="text" name="field_name" id="field_name" 
							multiple onChange={this.setFileData} /> 
					<label htmlFor="file">Upload Files:</label>
						<input type="file" name="file" id="file" 
							multiple onChange={this.setFileData} /> 
					<button onClick={this.onFileUpload}> Send </button> 
				</form>
			{this.renderFileData()}
		</div>
	);
	}
}

export default Upload;