var React = require('react');
var ReactDOM = require('react-dom');
// var Editor = require('../src/editor');
import Editor from '../src/editor';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			form_data: {
				text: "123",
				editor: ""
			}
		}
	}

	getQiniuUploader(){
		return {
            url:'http://127.0.0.1:8083/v5/sgCommunity/story/uploadImage.html',
            name: 'upload',
            type: 'local',
		}
	}
	handleFormChange(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var value = target.value;
		var editor = this.refs.editor.getContent();
		var form_data = this.state.form_data;
		form_data.text = value;
		form_data.editor = editor;
		this.setState({
			form_data: form_data
		})
	}
	handleSubmitForm(){
		var form_data = this.state.form_data;
		alert(form_data.editor);
	}
	handleChange(content){
		var form_data = this.state.form_data;
		form_data.editor = content;
		this.setState({
			form_data: form_data
		})
	}

	uploadImageCallback = (file) => {
		var image_url = file.upload
		return Promise.resolve({data: {image_src: image_url}, status: image_url ? 'success' : 'error'})
	}
	render(){
		  var uploader = this.getQiniuUploader();
		  var plugins = {
			    image:{
				      uploader:uploader
			    }
		  }
		  var count = 100;
		  var editors = [];
		  for(var i=0;i<count;i++){
			    editors.push({
				      plugins:plugins
			    })
		  }
		  var form_data = this.state.form_data;
		  return (<div>
			        <Editor
              plugins={plugins}
              value={form_data.editor}
              defaultValue="<p>React Umeditor</p>"
              onChange={this.handleChange.bind(this)}/>
		          </div>)
	}
}

ReactDOM.render(<App />, document.getElementById('react-container'));
