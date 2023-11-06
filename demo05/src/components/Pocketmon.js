import { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const Pocketmon = (props) => {
    const [pocketmonList, setPocketmonList] = useState([]);
    
    useEffect(() => {
        // 서버에서 포켓몬 목록을 가져와서 상태에 설정하는 코드
        axios({
            url: "http://localhost:8080/pocketmon/",
            method: "get",
        })
            .then((response) => {
                setPocketmonList(response.data);
            })
            .catch((err) => {});
    }, []);

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>포켓몬스터 관리</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
            </div>

           <div className="row mt-4">
            <div className="col">
            <table className="table table-hover text-center">
                <thead>
                    <tr className="table-warning text-center">
                        <th>번호</th>
                        <th>이름</th>
                        <th>속성</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {pocketmonList.map((pocketmon) => (
                        <tr key={pocketmon.no}>
                            <td>{pocketmon.no}</td>
                            <td>{pocketmon.name}</td>
                            <td>{pocketmon.type}</td>
                            <td><FaPencilAlt/></td>
                            <td><FaRegTrashAlt/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>               
            </div>
        </>
    );
};

export default Pocketmon;