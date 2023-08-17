var op1='',op2='',opcode="";
var active = true,clearFlag = false;
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
            if(reader.textContent =="")return;            
            if( active ){   // active flag represent which operand should be read.
                opcode = input;
                op1 = reader.textContent;
                results.textContent = op1 + input;
                reader.textContent = "";
                active = false;
                return;
            }
            else if(op2 =="" && reader.textContent != ""){
                op2 = reader.textContent;
                op1 = calculate(op1,op2,opcode);
                if(op1 == 'e'){
                    operate('ac');
                }
                reader.textContent = op1;
                results.textContent +=  op2 + input;
                clearFlag = true;   //clearFlag used to clear reader when we start reading 
                op2 = "";
                opcode = input;
            }
            else {
                opcode = input;
                results.textContent =  results.textContent.slice(0,results.textContent.length -1);
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
                }
                results.textContent += op2;
                active = true;
                reader.textContent = op1;
                op1 = "";
                op2 = "";
                clearFlag = true;
                break;
            }
        default:
        if (clearFlag){
            reader.textContent ="";
            clearFlag = false;
        }
        if(input == '.' && reader.textContent.includes('.'))
        {
            return;
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