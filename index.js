var op1='',op2='',opcode="";
var active = true,clearFlag = false ;
const results = document.getElementById("display");
const reader = document.getElementById("operator");
const buttons = document.querySelectorAll("button");
for(let i = 0;i< buttons.length;i++){
    buttons[i].addEventListener("click",()=>{
        operate(buttons[i].value); 
    });
}

function operate(input){

    switch(input){
        case 'del':{
            if(reader.textContent == "")return;
            reader.textContent = reader.textContent.slice(0,reader.textContent.length-1);
            break;
        }
        case 'ac':{
            op1="";
            op2="";
            res="";
            opcode="";
            active = true;
            reader.textContent = "";
            results.innerHTML = "";
        }
        case '+':
        case '-':
        case '*':
        case '/':{
            if(reader.textContent ==""){
                if(input == '-'){
                    reader.textContent+="-0";
                }
                return;        
            }    
            if( active ){   // active flag represent which operand should be read.
                opcode = input;
                op1 = reader.textContent;
                if(op1 < 0) results.textContent = '('+op1+')' + " " + input;
                else results.textContent = op1 + " " + input;
                reader.textContent = "";
                active = false;
                return;
            }
            else if(op2 =="" && reader.textContent != ""){
                if (clearFlag && input == '-'){
                    reader.textContent ="-0";
                    clearFlag = false;
                    return;
                }
                op2 = reader.textContent;
                op1 = calculate(op1,op2,opcode);

                if(op1 == 'e'){
                    operate('ac');
                    return;
                }

                reader.textContent = op1;

                if(op2<0)  results.textContent += " ("+ op2 + ") " + input;
                else results.textContent += " "+ op2 + " " + input;
                clearFlag = true;   //clearFlag used to clear reader when we start reading 
                op2 = "";
                opcode = input;
            }
            else {
                opcode = input;
                results.textContent =  results.textContent.substring(0,results.textContent.length -2);
                results.textContent += opcode;
            }
            break;
        }
        case "=":
            {
                if(op1 == "" )return;
                if(op2 == ''){
                    op2 = reader.textContent;
                }
                op1 = calculate(op1,op2,opcode);
                if(op1 == 'e'){
                    operate('ac');
                    return;
                }
                if(op2 < 0)  results.textContent += " ("+op2+')';
                else results.textContent += " "+op2;
                active = true;
                reader.textContent = op1;
                op1 = "";
                op2 = "";
                clearFlag = true;
                break;
            }
        default:
            if(input == '.' && reader.textContent.includes('.'))return;
            
            if (clearFlag){
                reader.textContent ="";
                clearFlag = false;
            }

            if(reader.textContent == '-0'){
                reader.textContent = '-';
            }
            reader.textContent += input;
    }

}

function calculate(op1,op2,opcode)
{
    switch (opcode){
        case '+':return (Number(op1) + Number(op2));
        case '-':return (op1 - op2);
        case '*':return (op1 * op2);
        case '/':{
            if(op2 == 0){
                alert("divide by zero error !!!");
                return 'e';
            }
            return (op1 / op2);
        }
    }
}