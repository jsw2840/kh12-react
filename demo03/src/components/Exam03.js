//function Exam03(){};
//const Exam03 = funcion(){};
// const Exam03 = () => {
//     const [money, setMoney] = useState(0);
//     return (
//         <>
//             <h1>세 번째 예제</h1>
//             <h2>출금 금액 : {money}원</h2>
//             <button className="btn btn-outline-success me-1" onClick={() => setMoney(money+100000)} >10만원</button>
//             <button className="btn btn-outline-info me-1" onClick={() => setMoney(money+50000)} >5만원</button>
//             <button className="btn btn-outline-secondary me-1" onClick={() => setMoney(money+10000)} >1만원</button>
//             <button className="btn btn-outline-warning me-1" onClick={() => setMoney(0)}>초기화</button>
//         </>
//     );
// };

import { useState } from "react";

function Exam03() {

    const [num, setNum] = useState(0);

    const h1Style = {
        color: "blue", // 원하는 색상으로 변경하세요
    };


    return (
        <>
            <h1 style={h1Style}>출금 금액 : {num}만원</h1>
            <button className="btn btn-success ms-3" onClick={() => setNum((prevNum) => prevNum + 10)}>10만원</button>
            <button className="btn btn-info ms-3" onClick={() => setNum((prevNum) => prevNum + 5)}>5만원</button>
            <button className="btn btn-secondary ms-3" onClick={() => setNum((prevNum) => prevNum + 1)}>1만원</button>
            <button className="btn btn-warning ms-3" onClick={() => setNum(0)}>초기화</button>
            <br/>
            <input type="range" min="0" max="1000" step="1" value={num} onChange={e=>setNum(parseInt(e.target.value))}/>
        </>
    );
}

export default Exam03;