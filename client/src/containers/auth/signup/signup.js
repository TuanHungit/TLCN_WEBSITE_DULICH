import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../store/actions';

import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import alertify from 'alertifyjs';
import Input from '../../../components/UI/input/input';
import propTypes from 'prop-types';
class Signup extends Component {
  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Họ và tên',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Địa chỉ email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
      password1: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Nhập lại password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: false,
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
      ...this.state.controls,
    };
    const updatedControlsElement = {
      ...updatedControls[inputIdentifier],
    };
    updatedControlsElement.value = event.target.value;
    updatedControlsElement.valid = this.checkValidity(
      updatedControlsElement.value,
      updatedControlsElement.validation
    );
    updatedControlsElement.touched = true;
    updatedControls[inputIdentifier] = updatedControlsElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };
  handleClick = (event) => {
    event.preventDefault();
    if (
      this.state.controls.password.value !== this.state.controls.password1.value
    ) {
      console.log('Password is not correct');
    } else {
      this.props.onAuthRegister(
        this.state.controls.name.value,
        this.state.controls.email.value,
        this.state.controls.password.value
      );

      //  actionCreator.authSignup({name, email, password });
    }
    // if (isAuthenticated) {
    //     return <Redirect to="/tour" />;
    //   }
    console.log(
      this.state.controls.name.value,
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  componentDidUpdate(nextProps, nextState) {
    if (this.props.signUpSuccess !== nextProps.signUpSuccess) {
      this.buttonElement.click();
    }
  }

  render() {
    const status = this.props.loadding ? <Spinner /> : null;
    const errors = this.props.error ? <p>{this.props.error}</p> : null;
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <div className='form-group'>
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          label={formElement.config.elementConfig.placeholder}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      </div>
    ));
    return (
      <div>
        <div
          className='modal fade modal-with-tabs form-login-modal'
          id='registerFormTabInModal'
          aria-labelledby='modalWIthTabsLabel'
          tabindex='0'
          role='dialog'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content shadow-lg'>
              <div className='tab-content'>
                <div
                  role='tabpanel'
                  className='tab-pane active'
                  id='registerFormTabInModal-login'
                >
                  <div className='form-login'>
                    <div className='form-header'>
                      <h4>Chào mừng đến website của chúng tôi</h4>
                      <p>
                        Đăng ký tài khoản để tiếp tục sử dụng dịch vụ của chúng
                        tôi.
                      </p>
                    </div>

                    <div className='form-body'>
                      <form>
                        <div className='d-flex flex-column flex-lg-row align-items-stretch'>
                          <div className='flex-md-grow-1 bg-primary-light'>
                            <div className='form-inner'>
                              {form}
                              <div className='d-flex flex-column flex-md-row mt-25 pl-5'>
                                <div className='flex-shrink-0'>
                                  <button
                                    className='btn btn-success btn-wide'
                                    onClick={this.handleClick}
                                    disabled={!this.state.formIsValid}
                                  >
                                    Đăng ký
                                  </button>
                                </div>
                                <div className='ml-0 ml-md-15 mt-15 mt-md-0'>
                                  <div className='custom-control custom-checkbox'>
                                    <input
                                      type='checkbox'
                                      className='custom-control-input'
                                      id='loginFormTabInModal-rememberMe'
                                    />
                                    <label
                                      className='custom-control-label'
                                      for='loginFormTabInModal-rememberMe'
                                    >
                                      Nhớ tôi
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='form-login-socials'>
                            <div className='login-socials-inner'>
                              <h5 className='mb-20'>
                                Hoặc đăng ký bằng tài khoản mạng xã hội
                              </h5>
                              <button className='btn btn-login-with btn-facebook btn-block'>
                                <i className='fab fa-facebook'></i> facebook
                              </button>
                              <button className='btn btn-login-with btn-google btn-block'>
                                <i className='fab fa-google'></i> google
                              </button>
                              <button className='btn btn-login-with btn-twitter btn-block'>
                                <i className='fab fa-twitter'></i> twitter
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      {errors}
                    </div>

                    <div className='form-footer'>
                      <p>
                        Bạn đã có tài khoản?{' '}
                        <a
                          href='tour-detail-02.html#loginFormTabInModal-login'
                          className='tab-external-link font600'
                        >
                          Đăng nhập
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='text-center pb-20'>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-labelledby='Close'
                    ref={(button) => (this.buttonElement = button)}
                  >
                    <span aria-hidden='true'>
                      <i className='far fa-times-circle'></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  authSignup: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    loadding: state.auth.loadding,
    error: state.auth.error,
    signUpSuccess: state.auth.signUpSuccess,
  };
};
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthRegister: (name, email, password) =>
      dispatch(actionCreator.authSignup(name, email, password)),
  };
};
//export default connect(mapStateToProps, { authSignup })(Signup);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
