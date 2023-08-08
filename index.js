var op1='',op2='',res="",opcode="";
var active = true;
const results = document.getElementById("display");
const reader = document.getElementById("operator");
const buttons = document.querySelectorAll("button");

for(let i = 0;i< buttons.length;i++){
    buttons[i].addEventListener("click",()=>{
        operate(buttons[i].value); 
    });
}

function operate(input){
    
    if(input == 'cl')
    {
        let str = reader.value;
        if(str.length == 0)return;
        reader.value = str.substring(0,str.length-1);
    }
    else if(input == 'del')
    {
        let str = reader.value;
        if(str.length == 0)return;
        reader.value = '';
        op1='';
        op2='';
        opcode = "";
        active = true;
        res = '';
        results.innerHTML = "";
    }
    else if(input == '+' || input == '-' || input == '*' || input == '/')
    {   
        
        if(active)
        {
         opcode = input;
         op1 = reader.value;
         active = false;
        }
        else{
            if(op2 != '')
              calculate(op1,op2,opcode);
              op2="";
              op1 = res;
              opcode = input;
        }
    }
    else if(input == "=" && op1 != '' && op2 !=''){
        calculate(op1,op2,opcode);
        reader.value = res;
    }
    else{
        let offset = '';

        if(input == '.'){
            offset="0";
        }
        if(active){
            
            reader.value += input + offset;
            op1 += input + offset;
        }
        else{
            if(res == '')
                results.textContent = op1 + opcode ;
            else 
                results.textContent = res + opcode ;
                console.log(op2);
            op2 += input + offset; 
            
            reader.value = op2;
        }
    }
}

function calculate(op1,op2,input){
    switch(input)
    {
        case '+':res = Number(op1) + Number(op2);
                break;
        case '-':res = op1 - op2;
                break;
        case '*':res = op1 * op2;
                break;
        case '/':res = op1 / op2;
                break;
    }
    op1 = res;
    op2 = '';
    console.log(op2);
    active = false;
    results.textContent = res;
    if(res != "")
    reader.value =res;
}