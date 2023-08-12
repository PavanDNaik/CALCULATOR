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
            if(reader.value == "")return;
            reader.value = reader.value.slice(0,reader.value.length-1);
            break;
        }
        case 'ac':{
            op1="";
            op2="";
            res="";
            opcode="";
            active = true;
            reader.value = "";
            results.textContent = "";
        }
        case '+':
        case '-':
        case '*':
        case '/':{
            if(reader.value =="")return;            
            if( active ){
                opcode = input;
                op1 = reader.value;
                results.textContent = op1 + input;
                reader.value = "";
                active = false;
                return;
            }
            else if(op2 =="" && reader.value != ""){
                op2 = reader.value;
                op1 = calculate(op1,op2,opcode);
                reader.value = op1;
                results.textContent +=  op2 + input;
                clearFlag = true;
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
                    op2 = reader.value;
                }
                op1 = calculate(op1,op2,opcode);
                results.textContent += op2;
                active = true;
                reader.value = op1;
                op1 = "";
                op2 = "";
                break;
            }
        default:
        if (clearFlag){
            reader.value ="";
            clearFlag = false;
        }
        reader.value += input;
    }

}

function calculate(op1,op2,opcode)
{
    switch (opcode){
        case '+':return (Number(op1) + Number(op2));
        case '-':return (op1 - op2);
        case '*':return (op1 * op2);
        case '/':return (op1 / op2);
    }
}