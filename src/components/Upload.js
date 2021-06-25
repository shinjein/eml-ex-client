import { postfiles } from "../api";
import React from 'react';

class Upload extends React.Component {
  state = {
      selectedFiles: null,
	};
	// On file select (from the pop up)
	onFileChange = event => {
	  this.setState({ 
      selectedFiles: event.target.files,
    });
	};
	// On file upload (click the upload button)
	handleFormSubmit = async (event) => {
		event.preventDefault();
		const { selectedFiles } = this.state;
		const file = new FormData();
    	file.append("myFile", selectedFiles);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
    const response = await postfiles(file, config);
		console.log("posting file...")
		console.log(response.data);
		}
  
  // async componentDidMount() {
  //   const response = await getfiles()
  // }

	fileData = () => {	
	if (this.state.selectedFiles) {
		return (
		<div>
			<h2>File Names:</h2>
        <p>File Name: {this.state.selectedFiles.name}</p>
        <p>File Type: {this.state.selectedFiles.type}</p>
    </div>
      );} else {
      return (
      <div>
        <br />
        <h4>Choose before Pressing the Upload button</h4>
      </div>
      );
    }
};
	
	render() {
	return (
		<div>
			<h1>
			E-Mail xportt Project (EmXP)
			</h1>
			<h3>
			File Upload using React!
			</h3>
			<form>
				<input 
					type="file" 
					name="myFile"
					multiple 
					onChange={this.onFileChange} />
				<button type="submit" onClick={this.handleFormSubmit}>
				Upload!
				</button>
			</form>
		{this.fileData()}
		</div>
	);
	}
}

export default Upload;


// https://medium.com/free-code-camp/how-to-create-file-upload-with-react-and-node-2aa3f9aab3f0

// import React from "react";
// import { addProject, uploadFile } from "../api";

// class AddProject extends React.Component {
//   state = {
//     title: "",
//     description: "",
//     imageUrl: "",
//   };

//   handleFileChange = (event) => {
//     this.setState({
//       imageUrl: event.target.files[0],
//     });
//   };

//   handleChange = (event) => {
//     let { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const { title, description, imageUrl } = this.state;

//     const uploadData = new FormData();
//     uploadData.append("file", imageUrl);

//     //1. Upload the image to our api
//     const response = await uploadFile(uploadData);

//     //2. Create the project on our api
//     const newProject = {
//       title,
//       description,
//       imageUrl: response.data.fileUrl,
//     };
//     await addProject(newProject);
//     this.props.history.push("/projects");
//   };

//   render() {
//     const { title, description } = this.state;
//     return (
//       <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
//         <label>Title</label>
//         <input
//           type="text"
//           name="title"
//           onChange={this.handleChange}
//           value={title}
//         />

//         <label>Description</label>
//         <input
//           type="text"
//           name="description"
//           onChange={this.handleChange}
//           value={description}
//         />

//         <label>Image</label>
//         <input type="file" onChange={this.handleFileChange} />

//         <button type="submit">Create</button>
//       </form>
//     );
//   }
// }

// export default AddProject;
