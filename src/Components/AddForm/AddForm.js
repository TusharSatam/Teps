import React from 'react';
import './addForm.css';
import clear from '../../asstes/icons/clear.png'
import person from '../../asstes/Ellipse 4.png'
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const AddForm = () => {
    const [error, seterror] = useState(false)
    return (
        <div>
            <div className='form-title'>
                <p>Add Your Strategy</p>
            </div>
            <div className='center-div'>
                <div className='form-main-div'>
                    <div className='two-selects '>
                        <div>
                            <p className='select-title'>Subject <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <p className='select-title'>Grade <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='two-selects '>
                        <div>
                            <p className='select-title'>Skill <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <p className='select-title'>Topic <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='two-selects '>
                        <div>
                            <p className='select-title'>Sub-Topic <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <p className='select-title'>Sub-Sub-Topic <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='two-selects '>
                        <div>
                            <p className='select-title'>Dev Dom 1 <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <p className='select-title'>Dev Dom 2 <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='two-selects '>
                        <div>
                            <p className='select-title'>Mode Of Teaching <p>*</p></p>
                            <select className={'select-field'} name="" id="">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div className='one-selects'>
                        <div>
                            <p className='select-title'>Learning Outcome <p>*</p></p>
                            <textarea className={'select-field-full'} name="" id="" />
                        </div>
                    </div>
                    <div className='one-selects-l'>
                        <div>
                            <p className='select-title'>Learning Outcome <p>*</p></p>
                            <textarea className={'select-field-full-2'} name="" id="" />
                        </div>
                    </div>
                    <div className='form-footer'>
                        <p className='form-note'>Note - The strategy will be added post approval by admin</p>
                        <button className='form-btn' onClick={() => seterror(!error)}>Submit Strategy</button>
                    </div>
                    {!error ? <p className='form-success'>Thank you for submitting the strategy</p>
                        : <p className='form-error'>Please fill all of the above fields !</p>}
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content modal-main-div">

                        <div className='modal-top'>
                            <h4 className='modal-title' id="exampleModalLongTitle">Liked By <FaHeart className='like-icon' /></h4>
                            <img className='modal-clear' data-dismiss="modal" aria-label="Close" src={clear} alt="" />
                        </div>
                        <div className='modal-body'>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                            <div>
                                <img src={person} alt="person pic" />
                                <p>User Name</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                modal
            </button>
        </div>
    );
};

export default AddForm;