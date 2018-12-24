import React, { Component } from 'react';
import styles from './dashboard.module.css';
import FormFields, { FormControl, checkFormValid, getFormData } from '../widgets/FormFields/formFields';
import { db, timeStamp } from '../../app-firebase';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Uploader from '../widgets/FileUploader/fileUploader';


export default class Dashboard extends Component {


    state = {
        editorState: EditorState.createEmpty(),
        error: '',
        loading: false,
        form: this.createForm(),
        formValid: false,

    }

    componentDidMount = () => {
        this.fetchTeams();
    }


    render() {
        return this.renderView()
    }


    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, error: '' })
        try {
            const snap = await db.ref('articles').orderByChild('id').limitToLast(1).once('value');
            const lastArticleId = snap.val() ? Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }))[0].id : 0;
            const article = { ...getFormData(this.state.form), date: timeStamp, id: (lastArticleId || 0) + 1 };
            article['team'] = parseInt(article['team']);

            console.log('the article ', article);
            await db.ref('articles').push(article);
            this.setState({ loading: false });

            this.props.history.push(`/articles/${article.id}`);
        } catch (e) {

            this.setState({ loading: false, error: e.message });
        }
    }

    onBlur = (name, data) => {
        let field = this.state.form[name];
        field = { ...field, ...data }
        const form = { ...this.state.form, [name]: field }
        this.setState({ form })
    }

    onInputChange = (name) => {
        return (data) => {
            let field = this.state.form[name];
            field = { ...field, ...data }
            const form = { ...this.state.form, [name]: field }
            this.setState({ form, formValid: checkFormValid(form) })
        }
    }

    onEditorStateChange = (editorState) => {
        let contentState = editorState.getCurrentContent();
        let html = stateToHTML(contentState);

        this.onInputChange('body')({ value: html });
        this.setState({ editorState });
    }


    onUploadComplete = (value) => {
        const form = { ...this.state.form };
        form.image.value = value.fileUrl;
        this.setState({ form });
    }



    renderView() {
        return (
            <div className={styles.Container}>
                <form onSubmit={this.onSubmit}>
                    {this.renderInputs()}
                </form>
            </div>
        );
    }



    renderInputs() {
        return (
            <div>
                <div className={styles.Uploader}>
                    <Uploader complete={this.onUploadComplete} />
                </div>

                <FormFields
                    control={this.state.form.author}
                    onChange={this.onInputChange('author')}
                    onBlur={this.onBlur}
                />

                <FormFields
                    control={this.state.form.title}
                    onChange={this.onInputChange('title')}
                    onBlur={this.onBlur}
                />
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName='my-editor-wrapper'
                    editorClassName='my-editor'
                    onEditorStateChange={this.onEditorStateChange}
                />
                <p>Select a Team</p>
                <FormFields
                    control={this.state.form.team}
                    onChange={this.onInputChange('team')}
                    onBlur={this.onBlur}
                />
                {this.renderError()}
                {this.renderSubmit()}
            </div>

        )
    }

    renderSubmit = () => {
        return this.state.loading ?
            <p>Loading...</p>
            : (
                <div>
                    <button type="button" disabled={!this.state.formValid} onClick={this.onSubmit}>Submit</button>
                </div>
            )
    }

    renderError = () => {
        return !(!!this.state.error) ? null : (
            <div className={styles.Error}>
                {this.state.error}
            </div>
        )
    }

    createForm() {
        return {
            author: FormControl('input', 'author', {
                value: '',
                native: {
                    name: 'author',
                    placeholder: 'Author...',
                    label: 'Author'
                },
                validation: {
                    required: true,
                }
            }),
            title: FormControl('input', 'title', {
                value: '',
                native: {
                    name: 'title',
                    placeholder: 'Enter the title...',
                    label: 'Title'
                },
                validation: {
                    required: true,
                }
            }),
            body: {
                name: 'body',
                value: '',
                valid: true
            },
            image: {
                name: 'image',
                value: {
                    fileName: '',
                    fileUrl: ''
                },
                valid: true
            },
            team: FormControl('select', 'team', {
                value: '',
                options: [],
                validation: {

                }
            })
        }
    }

    setTeamsOptions(teams) {
        return teams.map((team) => ({ value: team.id, text: team.name }));
    }

    async fetchTeams() {
        const snap = await db.ref('teams').once('value');
        const data = Object.keys(snap.val()).map((key) => ({ ...snap.val()[key], key }));


        this.setState((state) => {
            const form = { ...state.form };
            const team = form.team;
            team.options = this.setTeamsOptions(data)
            return { form }
        })
    }
}
