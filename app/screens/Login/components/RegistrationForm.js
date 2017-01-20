import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {FormGroup, ControlLabel, HelpBlock, FormControl, Button} from 'react-bootstrap';
// import LoginInput from './LoginInput';

// <form onSubmit={handleSubmit} className="login-form">
//     <Field name="username" label="Username" component={LoginInput} type="text"/>
//     <Field name="password" label="Password" component={LoginInput} type="password"/>
//     <button type="submit" className="submit-button login-form_submit-button">Sign In</button>
// </form>
class RegistrationForm extends Component {
    // getInitialState() {
    //     return {
    //         username: ''
    //     };
    // };
    checkFieldOnValid(field) {
        var currentCheckingField = this.registrationFields[field];
        currentCheckingField.valid = currentCheckingField.data.test(this.state[field]);
        if (currentCheckingField.valid) {
            return 'success';
        }
        return 'error';
    }

    constructor(props) {
        super(props);
        this.registrationFields = {
            username: {
                data: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
                valid: false
            },
            email: {
                data: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                valid: false
            },
            password: {
                data: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                valid: false
            },
            confirmPassword: {
                data: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                valid: false
            },
            fullName: {
                data: /^[а-яА-ЯёЁa-zA-Z0-9 ]+$/,
                valid: false
            }
        };
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            fullName: '',
            // formValid: false,
            authentication: false,
            showRegistrationForm: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeVisibilityRegistrationForm = this.changeVisibilityRegistrationForm.bind(this);
    }

    // componentWillUpdate(nextProps,nextStates){
    //     if(nextProps.showingForm === 'login'){
    //
    //     }
    // }
    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        let valid = true;
        Object.keys(this.registrationFields).map(function (item, index) {
            if (!that.registrationFields[item].valid) {
                valid = false;
            }
        });
        if (valid) {
            that.setState({authentication: true});
            setTimeout(function () {
                that.setState({authentication: false});
            }, 4000);
        } else {
        }
    }

    changeVisibilityRegistrationForm(e) {
        e.preventDefault();
        this.props.activeFormHandler('registration');
        this.setState({showRegistrationForm: !this.state.showRegistrationForm});
    }

    render() {
        return (
            <form
                className={"registration-form " + (this.state.authentication ? "authentication " : "") + (this.props.showingForm === 'registration' ? "showed" : "")}
                onSubmit={this.handleSubmit}>
                <div className="registration-form_header" onClick={this.changeVisibilityRegistrationForm}>
                    <label>Регистрация</label>
                </div>
                <div className="registration-form_content">
                    <FormGroup
                        controlId="authFormUsername"
                        validationState={this.checkFieldOnValid('fullName')}
                    >
                        <ControlLabel>ФИО</ControlLabel>
                        <FormControl
                            type="text"
                            className="registration-form-control"
                            value={this.state.fullName}
                            placeholder="Введите ваше имя пользователя..."
                            onChange={(e)=>{this.setState({fullName: e.target.value})}}
                        />
                        <FormControl.Feedback />
                        {/*<HelpBlock>Не меньше 5 символов, только латинские символы</HelpBlock>*/}
                    </FormGroup>
                    <FormGroup
                        controlId="authFormUsername"
                        validationState={this.checkFieldOnValid('username')}
                    >
                        <ControlLabel>Имя пользователя</ControlLabel>
                        <FormControl
                            type="text"
                            className="registration-form-control"
                            value={this.state.username}
                            placeholder="Введите ваше имя пользователя..."
                            onChange={(e)=>{this.setState({username: e.target.value})}}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Не меньше 5 символов, нижний и верхний регистры, только латинские символы</HelpBlock>
                        {/*<HelpBlock>Не меньше 5 символов, только латинские символы</HelpBlock>*/}
                    </FormGroup>
                    <FormGroup
                        controlId="authFormEmail"
                        validationState={this.checkFieldOnValid('email')}
                    >
                        <ControlLabel>Почта</ControlLabel>
                        <FormControl
                            type="text"
                            className="registration-form-control"
                            value={this.state.email}
                            placeholder="Введите ваш e-mail..."
                            onChange={(e)=>{this.setState({email: e.target.value})}}
                        />
                        <FormControl.Feedback />
                        {/*<HelpBlock>Не меньше 5 символов, только латинские символы</HelpBlock>*/}
                    </FormGroup>
                    <div className="row help-block-margin">
                        <div className="col-xs-6">
                            <FormGroup
                            controlId="authFormPassword"
                            validationState={this.checkFieldOnValid('password')}
                        >
                            <ControlLabel>Пароль</ControlLabel>
                            <FormControl
                                type="password"
                                className="registration-form-control"
                                value={this.state.password}
                                placeholder="Введите ваш пароль..."
                                onChange={(e)=>{this.setState({password: e.target.value})}}
                            />
                            <FormControl.Feedback />
                            <HelpBlock className="full-width-help-block">Цифры, латинские символы, верхний регистр обязательны</HelpBlock>
                        </FormGroup>
                        </div>
                        <div className="col-xs-6">
                            <FormGroup
                            controlId="authFormConfirmPassword"
                            validationState={this.checkFieldOnValid('confirmPassword')}
                        >
                            <ControlLabel>Подтверждение пароля</ControlLabel>
                            <FormControl
                                type="password"
                                className="registration-form-control"
                                value={this.state.confirmPassword}
                                placeholder="Введите ваш пароль..."
                                onChange={(e)=>{this.setState({confirmPassword: e.target.value})}}
                            />
                            <FormControl.Feedback />
                        </FormGroup></div>

                    </div>


                    <Button className="registration-form__submit" type="submit">
                        Регистрация
                    </Button>
                </div>
            </form>
        );
    }
}

// Decorate the form component
// LoginForm = reduxForm({
//     form: 'login' // a unique name for this form
// })(LoginForm);
RegistrationForm.contextTypes = {
    showingForm: React.PropTypes.string,
    activeFormHandler: React.PropTypes.func
};
export default RegistrationForm;
