import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';
import Warning from './components/Warning';

const words ={
  animal: ['elephant', 'tiger', 'giraffe', 'zebra','lion','cat','dog','horse','dinosour','panda','deer','cheetah','goat','squirrel','donkey','camel','kangaroo','rhinoceros','monkey','rabbit','wolf'],
  fruit: ['apple', 'banana', 'orange', 'grape','strawberry','watermelon','pineapple','mango','papaya','cherries','pear','kiwi','custerd apple','guava','blueberries','avocado','apricot','lemons'],
  country: ['usa', 'canada', 'france', 'japan','india','italy','argentina','afghanistan','australia','bangladesh','botswana','brazil','burma','china','cambodia','denmark','egypt','germany','indonesia','korea','maldives','norway','pakistan','russia','singapore','switzerland','zimbabwe'],
  chocolate:['diarymilk','fivestar','snickers','kitkat','munch','perk','mikybar','hersheys','bournville','galaxy','gems','nestle','kopiko','eclairs'],
  vegetable:['potato','tomato','brinjal','carrot','mushroom','cucumber','capsicum','beetroot','onion','bottlegourd','cauliflower','cabbage','ladyfinger','pumpkin','radish','beans'],
  occupation:['doctor', 'engineer', 'teacher', 'artist','pilot','architect','scientist','journalist'],
  sport:['football','cricket','hockey','badmanton','archery','athletics','baseball','basketball','cycling','billiards','chess','bowling','boxing','diving','golf'],
  color:['red','blue','green','yellow','black','orange','voilet','brown','purple','magenta','white','indigo','pink']
  // Add more categories and words as needed
};


//let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [category, setCategory] = useState('country');
  const [selectedWord, setWord] = useState('india');
  const [showwarning,setwarning]=useState(false);
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
        if(wrongLetters.length===4){
          show(setwarning);
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable,selectedWord]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const wordsInCategory = words[randomCategory];
    const selectedWord = wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];

    setCategory(randomCategory);
    setWord(selectedWord);

    //const random = Math.floor(Math.random() * words.length);
    //selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification}/>
      <Warning showNotification={showwarning}/>
      <h2> Guess the {category}</h2>
    </>
  );
}

export default App;