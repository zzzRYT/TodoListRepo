"use strict";

const input = document.querySelector('#input');
const plusBtn = document.querySelector('#button');

//페이지 로드시 db데이터 로드
window.addEventListener('DOMContentLoaded', ()=> {   
        fetch('/loadtodo', {
            method: "GET", //rest의 전달 기능 (조회)
            headers: {
                "Content-Type" : "application/json",
            },
        })
        .then((res)=>res.json())
        .then((data) => {
            console.log(data); //출력 결과 확인
            for(let i = 0; i < data.length; i++) {
                const values = Object.values(data[i]);
                console.log(values);
                addText(values[1], values[0], values[2]);   //db에서 불러온 데이터로 todo생성
            }
            for (let i = 0; i < data.length; i++) {
                //체크박스 on/off
                ClickToChekBox(data[i].id);
                //todo 삭제
                ClickToDelete(data[i].id);
                //todo 수정
                ClickToRevise(data[i].id);
            }
        })
});


//plus 버튼 클릭 시 동작
plusBtn.addEventListener('click', () => {
    location.reload(true); //plus버튼을 누르면 동시에 새로고침
    let text = input.value;

    const req = {
        description: text,
    };
    if(text !== "") {
        addText(text);
        fetch('/todolist', {
            method: "POST", //rest의 전달 기능 (데이터 생성) 
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.text())
        .then((data) => {
            // 서버의 응답에 따른 추가 동작 수행
            console.log(data);
        })
        input.value = '';
    } else {
        alert('입력이 필요합니다.');
    }
});

//입력하고 enter시 작동
input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        location.reload(true); //plus버튼을 누르면 동시에 새로고침
        let text = input.value
    
        const req = {
            description: text,
        };
        if(text !== "") {
            addText(text);
            fetch('/todolist', {
                method: "POST", //rest의 전달 기능 (데이터 생성) 
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(req),
            })
            .then((res) => res.text())
            .then((data) => {
                // 서버의 응답에 따른 추가 동작 수행
                console.log(data);
            })
            input.value = '';
        } else {
            alert('입력이 필요합니다.');
        }
    }
});

//checkbox 클릭 시 동작
function ClickToChekBox(i) {
    const checkBoxId = document.getElementById(`check${i}`);
    const printSpan = document.querySelector(`#print${i}`);
    const reviseBtn = document.getElementById(`revise${i}`);
    if(checkBoxId.value === "1") {
        checkBoxId.checked = true;
        printSpan.style.textDecoration = "line-through";
        reviseBtn.style.display = "none";
    } else {    
        checkBoxId.checked = false;
        printSpan.style.textDecoration = "";
        reviseBtn.style.display = "block";
    }
    checkBoxId.addEventListener('change', ()=> {
        if(checkBoxId.value === "1") {
            checkBoxId.value = "0";
            printSpan.style.textDecorationLine = "";
            reviseBtn.style.display = "block";
        } else {
            checkBoxId.value = "1";
            printSpan.style.textDecorationLine = "line-through";
            reviseBtn.style.display = "none";
        }

        const req = {
            id: i,
            is_check:checkBoxId.value,
        }
        fetch('/checkTodo', {
            method: "PATCH", //rest의 전달 기능 (수정)
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res)=>res.json())
    });
}

//delete버튼 클릭 시 동작
function ClickToDelete(i) {
    const deleteBtn = document.getElementById(`delete${i}`);
    const parentBox = document.getElementById(`divItem${i}`);
    deleteBtn.addEventListener('click', ()=> {
        parentBox.parentNode.removeChild(parentBox);
        const req = {
            id: i,
        }
        fetch('/deleteTodo', {
            method: "DELETE", //rest의 전달 기능 (수정)
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(req),
        });
    });
}

//revise버튼 클릭 시 동작
function ClickToRevise(i) {
    const reviseBtn = document.getElementById(`revise${i}`);
    const createSpan = document.getElementById(`print${i}`);
    const reSpan = document.getElementById(`reSpan${i}`);
    const finBtn = document.getElementById(`fin${i}`);
    const checkBtn = document.getElementById(`check${i}`);
    reviseBtn.addEventListener('click', ()=> {
        createSpan.style.display = "none";
        reviseBtn.style.display = "none";
        reSpan.style.display = "block";
        finBtn.style.display = "block";
        if(checkBtn.checked) {
            checkBtn.checked = false;
            createSpan.style.textDecorationLine = "none";
        }
    });

    finBtn.addEventListener('click', ()=> {
        const editText = reSpan.value;
        if(editText !== "") {
            createSpan.innerText = editText;
            createSpan.style.display = 'block';
            reviseBtn.style.display = "block";
            reSpan.style.display = "none";
            finBtn.style.display = "none";
        }else {
            alert('값을 입력하세요.');
        }
        
        const req = {
            id: i,
            description: editText,
        };

        fetch('/reviseTodo', {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(req)
        })
        .then((res)=>res.text())
        .then((data)=> console.log(data));
    });

    reSpan.addEventListener('keyup', (e)=> {
        if(e.keyCode === 13) {
            const editText = reSpan.value;
            if(editText !== "") {
                createSpan.innerText = editText;
                createSpan.style.display = 'block';
                reviseBtn.style.display = "block";
                reSpan.style.display = "none";
                finBtn.style.display = "none";
            }else {
                alert('값을 입력하세요.');
                
            }
            
            const req = {
                id: i,
                description: editText,
            };
    
            fetch('/reviseTodo', {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(req)
            })
            .then((res)=>res.text())
            .then((data)=> console.log(data));
        }
    });

}

//todo추가 함수
function addText(text, id=1, is_check=0) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('divItem');
    newDiv.id = `divItem${id}`;

    //check박스
    const newCheckBox = document.createElement('input');
    newCheckBox.classList.add('check-box');
    newCheckBox.setAttribute('type', 'checkbox');
    newCheckBox.value = is_check;
    newCheckBox.id = `check${id}`;

    //텍스트 넣기
    const createSpan = document.createElement('span');
    createSpan.classList.add(`print`);
    createSpan.innerText = text;
    createSpan.id = `print${id}`;
    //수정버튼 클릭 시 텍스트 창(display:none)
    const reSpan = document.createElement('input');
    reSpan.classList.add('reSpan');
    reSpan.id = `reSpan${id}`;
    reSpan.setAttribute('value', text);
    reSpan.style.display = "none";

    //수정 버튼
    const revise = document.createElement('i');
    revise.classList.add('reviseBox', "fa-solid", "fa-pen");
    revise.setAttribute('type','button');
    revise.id = `revise${id}`;
    const finBtn = document.createElement('input');
    //수정버튼 클릭 시 확인 버튼(display:none)
    finBtn.classList.add('finBtn');
    finBtn.id = `fin${id}`;
    finBtn.value = "완료";
    finBtn.setAttribute('type', 'button');
    finBtn.style.display = "none";

    //삭제 버튼
    const deleteBox = document.createElement('i');
    deleteBox.classList.add(`deleteBox`, "fa-solid","fa-trash");
    deleteBox.setAttribute('type','button');
    deleteBox.id = `delete${id}`

    //div에 넣기
    newDiv.append(newCheckBox , createSpan,reSpan, revise,finBtn, deleteBox);

    document.querySelector('.s-box').appendChild(newDiv);     
  }