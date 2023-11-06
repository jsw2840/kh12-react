import { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import "./Book.css";
const Book = (props)=>{
    const [bookList, setBookList] = useState([]);

    useEffect(()=>{
        axios({
            url:"http://localhost:8080/book/",
            method:"get",
        })
        .then(response=>{
            setBookList(response.data);
        })
        .catch(err=>{
            window.alert("통신 오류 발생");
        });
    }, []);
    return(
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
            </div>

           <div className="row mt-4">
            <div className="col">
            <table className="table table-hover text-center">
                <thead>
                    <tr className="table-warning text-center">
                        <th className="pc-only">도서번호</th>
                        <th>도서제목</th>
                        <th>저자</th>
                        <th className="pc-only">출간일</th>
                        <th>출판사</th>
                        <th>가격</th>
                        <th className="pc-only">페이지</th>
                        <th className="pc-only">장르</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((book) => (
                        <tr key={book.bookId}>
                            <td className="pc-only">{book.bookId}</td>
                            <td>{book.bookTitle}</td>
                            <td>{book.bookAuthor}</td>
                            <td className="pc-only">{book.bookPublicationDate}</td>
                            <td>{book.bookPublisher}</td>
                            <td>{book.bookPrice}</td>
                            <td className="pc-only">{book.bookPageCount}</td>
                            <td className="pc-only">{book.bookGenre}</td>
                            <td>
                            <FaPencilAlt/>
                            </td>      
                            <td>                   
                            <FaRegTrashAlt/>                        
                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>               
            </div>
        </>
    );
};

export default Book;