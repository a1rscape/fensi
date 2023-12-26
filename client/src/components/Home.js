import React, { useState } from 'react';
import '../css/Home.css';
import '../css/Answers.css'
import { FaTrashAlt } from 'react-icons/fa';
import { GiExitDoor } from "react-icons/gi";
import { signOut } from 'firebase/auth';
import { database } from '../Login/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [inputValueQuestions, setInputQuestions] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [callUno, setCallUno] = useState(false);
  const [callDos, setCallDos] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([]);
  let [idQuestions, setIdQuestions] = useState(1);
  const [answersClone, setAnswersClone] = useState([]);
  const [answersIndexes, setAnswersIndexes] = useState([0]);
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  let [id, setId] = useState(1);
  const history = useNavigate();
  let combinedArray = [];
  const baseUrl = "http://localhost:3001"
  const spaceStyle = { backgroundColor: 'rgb(43, 41, 41)', padding: '20px', borderRadius: '15px', marginBottom: '10px', marginTop: '5px' }
  function addAnswer() {
    if (!newAnswer) { alert("Enter an answer."); return; }
    const answer = { id: id, value: newAnswer };
    setAnswers(oldAnswers => [...oldAnswers, answer]);
    setAnswersClone(oldAnswers => [...oldAnswers, answer]);
    setId(++id); setNewAnswer("");
  }
  function deleteAnswer(id) { const newAnswers = answers.filter(item => item.id !== id); setAnswers(newAnswers); }
  let j = 0, count = 0;
  for (let i = 0; i < questionsArray.length; i++) {combinedArray.push(`Question ${i + 1}. ` + String(questionsArray[i].value).toUpperCase())
    for (j; j < answersClone.length; j++) {combinedArray.push(`${count + 1}. ` + answersClone[j].value);count++;
      if (count >= answersIndexes[i + 1]) {j++;break;}
    }count = 0;
  }
  function detectSpace(arr) {let sum = 0; for (let index = 0; index < arr.length; index++) {sum += arr[index];} return sum; }
  function addQuestion() {
    if (!inputValueQuestions) {alert("Enter an answer.");return;}
    const questionsArray = {id: idQuestions,value: inputValueQuestions};
    setQuestionsArray(oldAnswers => [...oldAnswers, questionsArray]);
    setIdQuestions(++idQuestions);setInputQuestions("");
  }
  const sendEmail = async () => {
    let dataSend = {combinedArray: combinedArray}
    const res = await fetch(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => { console.log(res); if (res.status > 199 && res.status < 300) alert("Sent succsessfully!"); }); }
  return (
      <div className='homeDiv'>
        <div className='createPanel'>
          <div className='container-1'>
            <p className='questionHint'>Question</p>
            <textarea type='text' className='inputQuestion' value={inputValueQuestions} onChange={e => setInputQuestions(e.target.value)}/>
            <p id='dropSpace'></p> <p className='questionHint' onClick={() => setOptionsShow(!optionsShow)}>Option</p>
            {optionsShow &&
              <div className='optionSelect'>
                <h2>Options</h2><br />
                <div className='optBtnContainer'>
                  <button className='optionsBtn bouncy' onClick={() => { setCallUno(!callUno); setOptionsShow(!optionsShow); setCallDos(false) }}>One true answer</button>
                  <button className='optionsBtn bouncy' onClick={() => { setCallDos(!callDos); setOptionsShow(!optionsShow); setCallUno(false) }}>Some true answers</button>
                </div>
              </div>}
            {callUno &&
                <div className='container'>
                  <textarea type="text" placeholder='Answer...' value={newAnswer} onChange={e => setNewAnswer(e.target.value)}/>
                  <button onClick={() => addAnswer()}>Add</button> <p style={spaceStyle} />
                  <div className='answers'>
                    {answers.map(item => {return (<p className="textAnswer" key={item.id}><input className="checkRadio" type="radio" name="answers" /> {item.value} <FaTrashAlt className='removeBtn' onClick={() => deleteAnswer(item.id)} /></p>)})}
                  </div>
                </div>}
            {callDos &&
                <div className='container'>
                  <textarea type="text" placeholder='Answer...' value={newAnswer} onChange={e => setNewAnswer(e.target.value)}/>
                  <button onClick={() => addAnswer()}>Add</button> <p style={spaceStyle} />
                  <div className='answers'>
                    {answers.map(item => {return (<p className="textAnswer" key={item.id}><input className="checkRadio" type="checkbox" name="answers" /> {item.value} <FaTrashAlt className='removeBtn' onClick={() => deleteAnswer(item.id)} /></p>)})}
                  </div>
                </div>}
          </div>
          <div>
            <button
              className='confirmBtn'
              onClick={() => {if (!inputValueQuestions) {alert('Error. Input question!');return;}
                if (answers.length === 0) { alert("Enter an answer."); return;}
                setAnswersIndexes(oldLengths => [...oldLengths, answersClone.length - detectSpace(answersIndexes)]);
                addQuestion(); setAnswers([]); }}>Confirm</button>
          </div>
        </div>
        <div className='editPanel'>
          <div className='headerOfView'>
            <h1>Exam</h1>
            <GiExitDoor className='logOut' onClick={() => { signOut(database).then(history('/')) }} />
          </div>
          {combinedArray.map((item, index) => (<p key={index} className='inView'>{item.value || item}</p>))}
        </div>
      </div>
  );
}
export default Home;