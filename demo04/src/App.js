import './App.css';
import { useState, useRef, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { Modal } from 'bootstrap/dist/js/bootstrap.esm';
import Jumbotron from './components/Jumbotron';

function App() {
  //목록을 위한 state
  const [todoList, setTodoList] = useState([
    { no: 1, title: "학원가기", type: "공부", edit:false},
    { no: 2, title: "영어단어외우기", type: "공부", edit:false },
    { no: 3, title: "헬스장가기", type: "운동", edit:false },
    { no: 4, title: "친구만나기", type: "일상", edit:false },
    { no: 5, title: "집에가기", type: "일상", edit:false }
]);
//등록을 위한 state
const [backup, setBackup] = useState([]); 
//수정을 위한state
const [data, setData] = useState({
    title: "",
    type: ""
});

const bsModal = useRef();

const changeData = e=>{
    const newData = {
        ...data,
        [e.target.name] : e.target.value
    };
    setData(newData);
}

//backup으로 복제
useEffect(()=>{
    setBackup(todoList.map(todo=>{
        return {...todo};
    }));
},[]);

//수정상태로 변경
const changeToEdit = (target) => {

    const newTodoList = todoList.map(todo => {
        if(todo.no === target.no){
            return {
                ...todo,
                edit: true
            }
        }
        return todo;
    });
    setTodoList(newTodoList);
};

//줄의 데이터 변경(입력값 변경)
const changeTodo = (target, e) => {
    const newTodoList = todoList.map(todo =>{
        if(todo.no === target.no){
            return {
                ...todo,
                [e.target.name] : e.target.value
            }
        }
        return todo;
    })
    setTodoList(newTodoList);
};

//취소
const cancelTodo = (target) =>{

    const findResult = backup.filter(todo => todo.no === target.no);
    const newTodoList = todoList.map(todo =>{
        if(todo.no === target.no){
            return {
                ...findResult[0],
                edit: false
            }
        }
        return todo;
    })
    setTodoList(newTodoList);
}

//완료
const saveTodo = (target) =>{

    //완료를 누르면 백업 데이터 갱신
    const newBackup = backup.map(todo => {
        if(todo.no === target.no){
            return {
                ...target,
                edit: false
            }
        }
        return todo;
    });
    setBackup(newBackup);

    //아이템이 있다면 그대로 복사해서 새로운 배열 만들어라
    const newTodoList = todoList.map(todo =>{
       if(todo.no === target.no){
        return{
            ...todo,
            edit:false
        }
       }
       return todo;
    })
    setTodoList(newTodoList);
};

//삭제
const deleteTodo = (target) => {
    const newTodoList = todoList.filter(todo => todo.no !== target.no);
    setTodoList(newTodoList);

    //백업 삭제
    const newBackup = backup.filter(todo => todo.no !== target.no);
    setBackup(newBackup);
};

//항목 추가
const addTodo = e=>{
    const no = todoList.length == 0 ? 1:todoList[todoList.length -1].no+1;

    //아이템 추가
    const newTodoList = todoList.concat({
        ...data,
        edit:false,
        no : no
    });
    setTodoList(newTodoList);

    //백업 추가
    const newBackup = [
        ...backup,
        {
            ...data,
            edit: false,
            no : no
        }
    ];
    setTodoList(newTodoList);

    //입력창 초기화
    setData({
        title:"",
        type:""
    });

    //모달 닫기
    closeModal();
}

//모달창 취소
const cancelAddTodo = ()=>{
     //입력창 초기화
     setData({
        title:"",
        type:""
    });
    //모달 닫기
    closeModal();
}

 //모달 여는 함수
const openModal = () => {
    var modal = new Modal(bsModal.current); //React style
    modal.show();
};

//모달 닫는 함수
const closeModal = () => {
    //만든 모달 중에 이 태그를 찾아서 닫아라
    var modal = Modal.getInstance(bsModal.current); //React style
    modal.hide();
};

  return (
    <div className="container-fluid MY-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">

          {/* 점보트론을 만들면서 제목과 내용을 전달 */}
          <Jumbotron title="일정 관리 프로그램" content="KH정보교육원 수업자료"/>

          {/* 화면 */}
          <div className="p-4 text-center text-warning mt-4">
                        <h1>TO-DO List</h1>
                    </div>

                    <div className="row mt-2">
                        <div className="col text-end">
                            <button type="button" className="btn btn-warning"
                                onClick={openModal}>
                                신규 등록
                            </button>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col text-center">

                            <table className="table table-hover">
                                <thead>
                                    <tr className="table-warning">
                                        <th className="col-2">체크</th>
                                        <th className="col-2">번호</th>
                                        <th className="col-3">오늘 할 일</th>
                                        <th className="col-2">목표</th>
                                        <th className="col-3">관리</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {todoList.map((todo, index)=>(
                                        todo.edit ?(
                                        <tr key={todo.no}>
                                        <td>{todo.no}</td>
                                        <td>
                                            <input type="text" value={todo.title} className="form-control"
                                            name="title" onChange={e=> changeTodo(todo, e)}/>
                                        </td>
                                        <td>
                                        <input type="text" value={todo.type} className="form-control"
                                            name="type" onChange={e=> changeTodo(todo, e)}/>
                                        </td>
                                        <td><input type="checkbox"/></td>
                                        <td>
                                        <button className="btn btn-sm btn-outline-secondary me-1"
                                                        onClick={e=> cancelTodo(todo)}>취소</button>
                                                    <button className="btn btn-sm btn-outline-warning"
                                                        onClick={e=> saveTodo(todo)}>완료</button>
                                        </td>
                                        </tr>
                                        ) : (
                                            <tr key={todo.no}>
                                            <td><input type='checkBox'/></td>
                                            <td>{todo.no}</td>
                                            <td>{todo.title}</td>
                                            <td>
                                              <span className="badge bg-primary me-2">
                                              {todo.type}
                                              </span>
                                            </td>
                                            <td>
                                            <button className="btn btn-sm btn-secondary me-1"
                                                        onClick={e=> changeToEdit(todo)}><FaPencilAlt className="text-danger"/></button>
                                                    {/* 함수를 부를 수 있게 하나 주고, 필요한 코드를 작성한다
                                                            이 반복문에서 사용한 item이라는 객체를 넘기겠다
                                                        */}
                                                    <button className="btn btn-sm btn-warning"
                                                       onClick={e=>deleteTodo(todo)} ><FaXmark className="text-danger"/></button>
                                            </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
            </div>

               {/* <!-- Modal --> */}
               <div className="modal fade" ref={bsModal} id="exampleModal" 
            data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">할 일 등록</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">오늘 할 일</label>
                                    <input name="title" className="form-control" value={data.title} onChange={changeData} />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label className="form-label">목표</label>
                                    <select className="form-select" value={data.type} onChange={changeData} >
                                    <option>공부</option>
                                    <option>운동</option>
                                    <option>일상</option>
                                    </select>
                                </div>
                            </div>
                        
                        </div>
                        <div className="modal-footer">
                            {/* 자동으로 닫히게 하는 버튼 */}
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">취소</button> */}
                            
                            {/* 수동으로 원하는 로직을 추가하여 닫히게 하는 버튼 */}
                            <button type="button" className="btn btn-secondary" onClick={cancelAddTodo}>취소</button>

                            <button type="button" className="btn btn-warning" onClick={addTodo}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default App;
