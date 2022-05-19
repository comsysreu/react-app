import React, { useState } from "react";
import PropTypes from 'prop-types';
import Yup from '../../components/Forms/Yup';
import { Formik } from 'formik';
import { Alert, Button, Container, FormGroup } from 'reactstrap';
import FForm from '../../components/Forms/Form';
import InputField from '../../components/Forms/InputField';

import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveUser } from '../../service/users';

const Picker = () => {

    const addMonths = (value, months, operation) => {
        console.log(value, months)
        const date = new Date(value);
        if (operation === 'plus') {
            return date.setMonth(date.getMonth() + months);
        } else if (operation === 'substract') {
            return date.setMonth(date.getMonth() - months);
        } else {
            return date;
        }
    }

    const [date, setDate] = useState(addMonths(new Date(), 216, 'substract'));

    const handleCalendarClose = () => {
        console.log("Calendar closed", date);
        // onTrigger();
    };
    const handleCalendarOpen = () => {
        console.log("Calendar opened", date);
        // onTrigger();
    };

    // const onTrigger = () => {
    //     console.log('onTrigger', date, parentCallback);
    //     this.parentCallback.set(date);
    //     // this.props.parentCallback();
    //     // event.preventDefault();
    // }

    return (
        <DatePicker
            selected={date}
            dateFormat="yyyy/MM/dd"
            minDate={addMonths(new Date(), 1080, 'substract')}
            maxDate={addMonths(new Date(), 216, 'substract')}
            onChange={(date) => setDate(date)}
            onCalendarClose={handleCalendarClose}
            onCalendarOpen={handleCalendarOpen}
        />
    );
};

class Calendar extends React.Component {

    constructor() {
        super();
        this.state = {
            date: this.addMonths(new Date(), 216, 'substract'),
        }

        this.updateDate = this.updateDate.bind(this);
    }

    optionsNotification = {
        position: "top-center",
        autoClose: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }

    onTrigger = (event) => {
        console.log('ON TRIGGER; ', event);
        this.props.parentCallback(event);
        // event.preventDefault();
    }

    addMonths = (value, months, operation) => {
        console.log(value, months)
        const date = new Date(value);
        if (operation === 'plus') {
            return date.setMonth(date.getMonth() + months);
        } else if (operation === 'substract') {
            return date.setMonth(date.getMonth() - months);
        } else {
            return date;
        }
    }

    handleCalendarClose = () => {
        console.log("Calendar closed", this.props, this.state);
    };

    handleCalendarOpen = () => {
        console.log("Calendar opened", this.props, this.state);
    };

    updateDate(date) {
        console.log('llega al metodo', date);
        this.setState({
            date: date
        });
        this.onTrigger(date);
    }

    render() {
        return (
            <DatePicker
                selected={this.state.date}
                dateFormat="yyyy/MM/dd"
                minDate={this.addMonths(new Date(), 1080, 'substract')}
                maxDate={this.addMonths(new Date(), 216, 'substract')}
                onChange={(date) => this.updateDate(date)}
                onCalendarClose={this.handleCalendarClose}
                onCalendarOpen={this.handleCalendarOpen}
            />
        )
    }
}


class Register extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    initialValues = {
        name: '',
        username: '',
        email: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    };

    state = {
        birthday: new Date(),
    }

    validationSchema = Yup.object({
        name: Yup.string()
            .required('Campo requerido')
            .min(5, 'Longitud minima invalida'),
        username: Yup.string()
            .trim()
            .required('Campo requerido')
            .min(5, 'Longitud minima invalida'),
        email: Yup.string()
            .required('Campo requerido')
            .email()
            .min(15, 'Longitud minima invalida'),
        birthday: Yup.date(),
        // .required('Campo requerido'),
        password: Yup.string().min(6, 'Contraseña demaciada corta.').required('Ingrese una contraseña'),
        confirmPassword: Yup.string().min(6, 'Contraseña demaciada corta.').required('Confirme la contraseña')
    });

    _handleSubmit = async (values, { resetForm }) => {

        console.log('VALUES', values, this.state);

        if (values.password !== values.confirmPassword) {
            toast.error('Las contraseñas deben ser iguales', this.optionsNotification);
            return;
        }

        if (this.state.data === '') {
            toast.error('La fecha es requerida', this.optionsNotification);
            return;
        }

        const payload = {
            name: values.name,
            username: values.username,
            email: values.email,
            birthday: this.state.data,
            password: values.password,
        };

        saveUser(payload).then(json => {
            console.log(json);
            this.users = json;
            toast.success('Registro realizado exitosamente.', this.optionsNotification);
            resetForm({
                name: '',
                username: '',
                email: '',
                birthday: '',
                password: '',
                confirmPassword: '',
            });
            this.setState({
                data: ''
            })
        }).catch(error => {
            toast.success('Se produjo un error al guardar el registro, intente nuevamente.', this.optionsNotification);
        });
    };

    handleCallback = (childData) => {
        console.log('CATCH DATA', childData);
        console.log(typeof childData)
        if (childData !== null) {
            this.setState({
                data: childData.toString()
            })
        } else {
            this.setState({
                data: ''
            })
        }

        console.log('CATCH STATE', this.state);
    };

    constructor() {
        super();
        this.state = {
            message: "my friend (from state)!",
            data: ''
        };
        this.updateMessage = this.updateMessage.bind(this)

        this.updateMessage();
    }

    users = [];

    updateMessage() {
        console.log('llega al metodo');
        this.setState({
            message: "my friend (from changed state)!"
        });
    }

    setUserSubmittedFormValues = (values) => {
        values = {};
    }

    render() {

        return (
            <div className="App" >
                <h3>Registrarse</h3>
                <header className="App-header">
                    <div className="auth-page">
                        <Container>
                            <Formik
                                initialValues={this.initialValues}
                                validationSchema={this.validationSchema}
                                enableReinitialize
                                onReset={(values) => this.setUserSubmittedFormValues(values)}
                                onSubmit={this._handleSubmit}>
                                <FForm>
                                    <fieldset>
                                        {
                                            this.props.errorMessage && (
                                                <Alert className="alert-sm" color="danger">
                                                    {this.props.errorMessage}
                                                </Alert>
                                            )
                                        }
                                        <FormGroup>
                                            <InputField
                                                className="form-control no-border"
                                                placeholder="Nombre Completo"
                                                type="text"
                                                name="name"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <InputField
                                                className="form-control no-border"
                                                placeholder="Usuario"
                                                type="text"
                                                name="username"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <InputField
                                                className="form-control no-border"
                                                placeholder="Email"
                                                type="email"
                                                name="email"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Calendar parentCallback={this.handleCallback}></Calendar>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputField
                                                className="form-control no-border"
                                                placeholder="Contraseña"
                                                type="password"
                                                name="password"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <InputField
                                                className="form-control no-border"
                                                placeholder="Confirmar contraseña"
                                                type="password"
                                                name="confirmPassword"
                                            />
                                        </FormGroup>
                                        <Button
                                            disabled={this.props.isFetching}
                                            type="submit"
                                            color="info"
                                            className="auth-btn mb-3"
                                            size="sm">
                                            {this.props.isFetching ? 'Cargando...' : 'Entrar'}
                                        </Button>
                                    </fieldset>
                                </FForm>
                            </Formik>
                        </Container>
                    </div>
                </header>
            </div >
        )
    }
}

export default Register