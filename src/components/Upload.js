import { postfiles } from "../api";
import React, { useState } from 'react';

const Upload = () => {
	const [username, setUsername] = useState();
	const [fileNames, setFileNames] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState();

	const handleUser = (e) => {
		setUsername(e);
	}

	const handleFileData = (e) => {
		const files = e.target.files;
		let file_names = [];		
			for (let i = 0; i < files.length; i++) {
				file_names.push(files[i].name); 
				console.log(file_names);
			}
		setFileNames(file_names);
		setSelectedFiles(files);
	};

	const onFileUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
			for (const file of selectedFiles ) {
				formData.append("files", file);
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

	const renderFileName = () => {	
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
			)
	};
	
return ( 
		<>
			<h1>Sm@il</h1> 
			<h4>view contents of bulk .eml files without opening them</h4>
				<form onSubmit={onFileUpload}>
					<label htmlFor="file">Username:</label>
						<input 
							multiple
							type="username" 
							name="username"  
							value={username}  
							onChange={handleUser} /> 
					<label htmlFor="file">Upload Files:</label>
						<input 
							multiple
							type="file" 
							name="files"  
							onChange={handleFileData} /> 
					<button> Send </button> 
				</form>
				{renderFileName(fileNames)}
			</>
		);
}

export default Upload;