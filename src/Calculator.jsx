import React, {useState} from 'react'

function Calculator(){
    const [input, setInput] = useState('');
    const [result, setResult] = useState(''); 
    
    const operators = ['+', '-', '*', '/'];
    const isOperator = (symbol) => {
        return /[*/+-]/.test(symbol);
      };
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

    const regex = /[.]/g;
    const et = input.trim();

    
    const handleButtonClick = (text) => {
        if (text==='clear'){
            if (input === '0'){
                return
            } else {
                setInput('0');
                setResult('');   
            };   
        };
        if (text === '.' && regex.test(input)){
            const lastChar = input.split(/[-+/*]/g).pop();
            
            if (!lastChar) {return};
            if (lastChar.includes(".")) {return};
            setInput(input + text) 
            return       
        };
        if(text === '0' && input.charAt(0) === '0'){return};
        if (input.startsWith('0') && text !== '.' && input.length === 1 && !operators.includes(text)){
            setInput(input.slice(1) + ' ' + text)      
        } else if (operators.includes(text) && operators.includes(input.slice(-1))) {
            if(text === '-'){
                setInput(input + ' ' + text);
                return
            }; 
            setInput(input.replace(input.slice(-1), text))
                return
        } else if (numbers.includes(text) && operators.includes(input.slice(-1))) {            
            setInput(input + ' ' + text)
        } else if (operators.includes(text) && operators.includes(input.slice(-1))){setInput(input.replace(input.slice(-1), text))
            return
        } else if (numbers.includes(text) && !input.startsWith('+') && !input.startsWith('-') && !input.startsWith('*') && !input.startsWith('/')){            
            setInput(' ' + input + text)
        } else if (numbers.includes(text) && operators.includes(input.charAt(0))) {            
            setInput(' ' + input.slice(1) + text)
        } else if (numbers.includes(text) && operators.includes(input.slice(-1))) {            
            setInput(' ' + input.slice(1) + ' ' + text)
        } else if (operators.includes(text)) {
            setInput(' ' + input + ' ' + text)
        } 
        if (text === '=') {
            try{
                if (operators.includes(input.slice(-1))){
                }   
                calculate();
                // setInput('')        
                // setResult(eval(input))                    
            } catch(error){
                setResult('Error')
                return                
            }        
        } if (result !== '' && operators.includes(text)){
            setInput(result + ' ' + text)
            return
        }
    };   

    const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setResult(eval(result + newExpression));
    } else {
      setResult(eval(newExpression))
    }
    setInput("");
    };


    return(
        <div className='calculator'>
            <div id='display'>
                <div id='display-1'>{input}</div>
                <div id='display-2'>{result}</div>
            </div>
            <div className='main'>
                <div className='numbers'>
                    <button onClick={() => {handleButtonClick('1')}} id='one'>1</button>
                    <button onClick={() => {handleButtonClick('2')}} id='two'>2</button>
                    <button onClick={() => {handleButtonClick('3')}} id='three'>3</button>
                    <button onClick={() => {handleButtonClick('4')}} id='four'>4</button>
                    <button onClick={() => {handleButtonClick('5')}} id='five'>5</button>
                    <button onClick={() => {handleButtonClick('6')}} id='six'>6</button>
                    <button onClick={() => {handleButtonClick('7')}} id='seven'>7</button>
                    <button onClick={() => {handleButtonClick('8')}} id='eight'>8</button>
                    <button onClick={() => {handleButtonClick('9')}} id='nine'>9</button>
                    <button onClick={() => {handleButtonClick('0')}} className='grid-col-span-2' id='zero'>0</button>  
                    <div className='other-buttons'>
                        <button onClick={() => {handleButtonClick('.')}} id='decimal'>.</button>
                        <button onClick={() => {handleButtonClick('clear')}} id='clear'>AC</button>
                    </div>                      
                </div>
                <div className='operators'>
                    <button onClick={() => {handleButtonClick('+')}} id='add'>+</button>
                    <button onClick={() => {handleButtonClick('-')}} id='subtract'>-</button>
                    <button onClick={() => {handleButtonClick('*')}} id='multiply'>*</button>
                    <button onClick={() => {handleButtonClick('/')}} id='divide'>/</button>
                    <button onClick={() => {handleButtonClick('=')}} id='equals' className='grid-row-span-2'>=</button>
                </div>

            </div>
        </div>
    )
}

export default Calculator