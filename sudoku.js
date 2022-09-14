
const puzzleBoard = document .querySelector('.puzzle')
const solve = document .querySelector('#solve-button')
const squares = 81;
const submission = []

for(let i = 0; i<squares; i++){
    const inputElement = document.createElement('input')  //document.createElement('name of the element') creates a html element
    inputElement.setAttribute('type','number')            //setting attributes to inputElement :it should be +ve number only
    inputElement.setAttribute('min','1')                  //setting attributes to inputElement :it should be from 0
    inputElement.setAttribute('max','9')                  //setting attributes to inputElement :till 9 
    puzzleBoard.appendChild(inputElement)                 //we selected our .puzzle div and in that we inserted our inputElemnt variable
}                                                         //each samll box is a inputElement   

function joinValues(){                                    //creating a function joinValues
    const inputs = document.querySelectorAll('input')     //selcting all the 'input' and storing it in inputs variable
    inputs.forEach(input => {                             //now for each inputs if input value exists then store that 
        if(input.value){                                  //input value in submission array
            submission.push(input.value)                  //else store a '.' in submission array 
         }                                                //NOTE: inputs is a const variable in which we have stored all the 'input' values 
         else{                                            // and inputElement is a const variable in which we have created a small box to take numbers frm user.
             submission.push('.')
         }
    });
    console.log(submission)
}
//solve.addEventListener('click', joinValues)

function populateValues(isSolvable, solution){
    const show = document.querySelector('.txt')
    const inputs = document.querySelectorAll('input')
    console.log(inputs)
    if(isSolvable && solution){
        inputs.forEach((input ,j) => {
            input.value = solution[j]
        })
        show.innerHTML = 'Yay the Sudoku is Solvable!'
    } else{
        show.innerHTML = 'Oops Sudoku is not solvable pls check the input numbers on the board'
    }
}

function solveSudoku(){
    joinValues()
    const data  = {numbers: submission.join('')}                  //.join() will convert our submission array in a string and separate each and every string element by 
    console.log('data', data)                                   //format specifier mentioned in the () barcket if u leave the bracket empty then by default it will seperate each and every elemnt by a comma(,)
    
    fetch('https://project-sathom.herokuapp.com/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })  .then(response => response.json())  
        .then(function(data){
            console.log(data)
            populateValues(data.solvable, data.solution)
        }).catch(function (error){
	        console.log(error)
        })
    
}
solve.addEventListener('click', solveSudoku)