import React, { Component } from 'react'
import { storage } from '../../../app-firebase';
import FileUploader from 'react-firebase-file-uploader';
export default class Uploader extends Component {

    state = {
        name: '',
        uploading: false,
        progress: 0,
        fileUrl: '',
        error: ''
    }

    storageRef = storage.ref('images')

    onUploadStart = () => {
        this.setState({ progress: 0, uploading: true })
    }

    onUploadError = ({ message }) => {
        this.setState({ progress: 0, uploading: false, error: message })
    }

    onUploadSuccess = async (fileName) => {
        try {
            const fileUrl = await this.storageRef.child(fileName).getDownloadURL()
            this.setState({ progress: 100, uploading: false, name: fileName, fileUrl });
            this.props.complete({ fileName,  fileUrl });
        } catch (e) {
            this.onUploadError(e);
        }


    }

    onProgress = (progress) => {
        this.setState({ progress })
    }


    render() { return this.renderView(); }

    renderView() {
        return (
            <div>
                <FileUploader
                    accept="image/*"
                    name="image"
                    randomizeFilename={true}
                    storageRef={this.storageRef}
                    onUploadStart={this.onUploadStart}
                    onUploadError={this.onUploadError}
                    onUploadSuccess={this.onUploadSuccess}
                    onProgress={this.onProgress}
                />
                {this.renderProgress()}
            </div>
        );
    }

    renderProgress() {
        return this.state.uploading ? <p>Progress {this.state.progress}%</p> : this.renderImage();
    }

    renderImage() {
        return !!this.state.fileUrl ? <img style={{height: '100%', width: '100%'}} src={this.state.fileUrl} alt={this.state.name} /> : null
    }
}
