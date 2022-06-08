import React from 'react';
import './searchscrean.css'
import likeIcon from '../../asstes/like.svg'
import downloadIcon from '../../asstes/download.svg'
import icon1 from '../../asstes/Group 70.svg'
import icon2 from '../../asstes/Group 71.svg'
const SearchScrean = () => {
    return (
        <>
            <div className='stratigy_bg'>
                <div className='d-flex flex-column justify-content-center align-items-center py-5 my-3'>
                    <div className='my-3 '>
                        <select className='px-3 py-2 bg-light mx-3 select-border' name="" id="">
                            <option value="" selected>Grade</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Subject</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Topic</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='d-none d-md-inline px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Skill</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                    </div>
                    <div>
                        <select className='d-inline d-md-none px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Skill</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Sub - topic</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Sub sub - topic</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* <div className='d-flex justify-content-end'>
                <select className='px-3 py-1 bg-light mx-3 ' name="" id="">
                    <option value="" selected>Language</option>
                    <option value="">English</option>
                    <option value="">Bangla</option>
                </select>
            </div> */}
            <div className='d-flex justify-content-end me-3'>
                <div id="google_translate_element"></div>
            </div>
            <div style={{ marginLeft: "60px" }} className='mb-5'>
                <p className='search-head'>You can find the strategies here</p>
                <p className='mt-5'> <span className='sub-title'>Sub-topic:</span> <span className='sub-subtitle'>English grammar - Dialog building</span> </p>
            </div>
            <div className='container my-4'>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>Strategy</span> <span className='counter_str'>1</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={downloadIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex'>
                        <img width="40%" className='me-5' src={icon1} alt="" />
                        <img width="40%" src={icon2} alt="" />
                    </div>
                </div>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>Strategy</span> <span className='counter_str2'>2</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={downloadIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex'>
                        <img width="40%" className='me-5' src={icon1} alt="" />
                        <img width="40%" src={icon2} alt="" />
                    </div>
                </div>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>Strategy</span> <span className='counter_str3'>3</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={downloadIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex'>
                        <img width="40%" className='me-5' src={icon1} alt="" />
                        <img width="40%" src={icon2} alt="" />
                    </div>
                </div>
                <div className='row my-4'>
                    <div className='col-2'>
                        <span className='Strategy_count'>Strategy</span> <span className='counter_str4'>4</span>
                    </div>
                    <div className='col-8 Strategy_count_article'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={downloadIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex'>
                        <img width="40%" className='me-5' src={icon1} alt="" />
                        <img width="40%" src={icon2} alt="" />
                    </div>
                </div>
                <div className='row my-4 pb-5'>
                    <div className='col-2'>
                        <span className='Strategy_count'>Strategy</span> <span className='counter_str5'>5</span>
                    </div>
                    <div className='col-8 Strategy_count_article pb-5'>
                        <p>
                            This collaborative technique involves setting a scene and, with the students’ help,
                            writing a dialogue on the board including the language you want to focus on. In Unit
                            10.6, the teacher provides a framework for a dialogue between waiters and customers in
                            a restaurant. This is a familiar situation in which the indefinite pronouns something,
                            anything and nothing occur naturally. Students then either practise the dialogue in pairs
                            as it is or with variations (eg different choices of food and drink, a different type of
                            restaurant). A great way to push students towards memorising the language is to gradually
                            erase the text, word by word, until the students are repeating the dialogue from memory.
                        </p>
                        <div className='d-flex align-items-center my-3'>
                            <img className='me-3' src={downloadIcon} alt="" />
                            <img src={likeIcon} alt="" />
                        </div>
                    </div>
                    <div className='col-2 d-flex'>
                        <img width="40%" className='me-5' src={icon1} alt="" />
                        <img width="40%" src={icon2} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchScrean;