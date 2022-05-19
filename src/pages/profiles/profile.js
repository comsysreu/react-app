import React from "react";
import { Alert, Button, Container, FormGroup } from 'reactstrap';
import { Formik } from 'formik';
import FForm from '../../components/Forms/Form';
import InputField from '../../components/Forms/InputField';
import Yup from '../../components/Forms/Yup';

class Profile extends React.Component {

    initialValues = {
        profileName: '',
    };

    validationSchema = Yup.object({
        profileName: Yup.string()
            .required('Campo requerido')
            .min(5, 'Longitud minima invalida')
    });

    _handleSubmit = async (values) => {

        console.log('VALUES', values, this.state);

    };

    render() {

        return (
            <div className="App" >
                <h3>Componente de perfiles</h3>
                <header className="App-header">
                    <div className="auth-page">
                        <Container>
                            <Formik
                                initialValues={this.initialValues}
                                validationSchema={this.validationSchema}
                                // enableReinitialize
                                // onReset={(values) => this.setUserSubmittedFormValues(values)}
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
                                                placeholder="Nombre Perfil"
                                                type="text"
                                                name="profileName"
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
            </div>
        )
    }
}

export default Profile