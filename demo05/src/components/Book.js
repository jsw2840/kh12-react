import {useState, useEffect, useRef} from "react";
import axios from "axios";

import {LiaEdit} from "react-icons/lia";
import {AiFillDelete, AiOutlinePlus} from "react-icons/ai";
import { Modal } from "bootstrap";
import "./Book.css";
const Book = (props) => {
    const [bookList, setBookList] = useState([]);

    const loadBook = () => {
        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/`,
            method: "get",
        })
            .then(response => {
                setBookList(response.data);
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    };

    useEffect(() => {
        loadBook();
    }, []);

    const deleteBook = (book) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method: "delete",
        })
            .then(response => {
                loadBook();//목록 갱신
            })
            .catch(err => {
                window.alert("통신 오류 발생");
            });
    };

    //modal 관련된 처리
    const bsModal = useRef();
    const openModal = ()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = ()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        clearBook();
    };

    //등록과 관련된 state
    const [book,setBook] = useState({bookTitle:"",bookAuthor:"",
    bookPublicationDate:"",bookPublisher:"",bookPrice:"",
    bookPageCount:"",bookGenre:""})
    const changeBook = (e) => {
        setBook({
            ...book,
           [e.target.name] : e.target.value
        });
    };
    const clearBook = ()=>{
        setBook({bookTitle:"",bookAuthor:"",
        bookPublicationDate:"",bookPublisher:"",bookPrice:"",
        bookPageCount:"",bookGenre:""});
    };

     //axios로 서버에 등록 요청을 보낸 뒤 등록이 성공하면 목록을 갱신하도록 처리
    //  const saveBook = ()=>{
    //     //입력값 검사 후 차단 코드 추가

    //     axios({
    //         url:`${process.env.REACT_APP_REST_API_URL}/book/`,
    //         method:"post",
    //         data:book
    //     }).then(response=>{//성공했다면
    //         loadBook();//목록을 갱신하고
    //         closeModal();//모달을 닫아라
    //     })
    //     .catch(err=>{});
    // };
    //async 함수와 await 키워드를 사용한 간소화 작업이 가능
    //-비동기 작업을 동기화된 코드로 작성할 수 있다
    const saveBook = async()=>{
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data:book
        });
        loadBook();//목록을 갱신하고
        closeModal();//모달을 닫아라
    };

       //도서 수정 창 열기
    //-target 은 수정 버튼을 누른 행의 포켓몬스터 정보
    //-target의 정보를 book으로 카피 후 모달 열기
    const editBook = (target)=>{
        setBook({...target});
        openModal();
    };

    // //도서 수정 처리
    // const updateBook = () =>{
    //     //검사 후 차단 처리

    //     const {bookId,bookTitle,bookAuthor,
    //     bookPublicationDate,bookPublisher,bookPrice,
    //     bookPageCount,bookGenre}=book;
    //     axios({
    //         url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
    //         method:"put",
    //         data:{
    //             bookTitle : bookTitle, bookAuthor : bookAuthor,
    //             bookPublicationDate : bookPublicationDate,
    //             bookPublisher : bookPublisher, bookPrice : bookPrice,
    //             bookPageCount : bookPageCount, bookGenre : bookGenre
    //         }
    //     })
    //     .then(response=>{
    //         loadBook();
    //         closeModal();
    //     })
    //     .catch(err=>{});
    // };
     //도서 수정 처리
    const updateBook= async()=>{
        //검사 후 차단 처리
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"put",
            data:{...book}
        });
        loadBook();//목록을 갱신하고
        closeModal();//모달을 닫아라
    };
    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>도서 관리</h1>
                    <p>React CRUD 연습 예제</p>
                </div>
            </div>

             {/* 추가 버튼 */}
             <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success" onClick={openModal}>
                        <AiOutlinePlus/>
                        추가
                    </button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-hover text-center">
                        <thead>
                            <tr className="table-warning text-center">
                                <th className="pc-only">번호</th>
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
                                        <LiaEdit className="text-warning"
                                        onClick={e=>editBook(book)} />
                                    </td>
                                    <td>
                                        <AiFillDelete className="text-danger"
                                            onClick={e => deleteBook(book)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" ref={bsModal} 
                        data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" >
                            {book.bookId === undefined ? '신규 도서 등록' : `${book.bookId}번 도서 수정`}
                        </h5>
                        <button type="button" className="border-0 bg-transparent"
                            onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="row">
                            <div className="col">
                                <label className="form-label">도서제목</label>
                                <input type="text" name="bookTitle" className="form-control"
                                        value={book.bookTitle} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">저자</label>
                                <input type="text" name="bookAuthor" className="form-control"
                                        value={book.bookAuthor} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">출간일</label>
                                <input type="text" name="bookPublicationDate" className="form-control"
                                        value={book.bookPublicationDate} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">출판사</label>
                                <input type="text" name="bookPublisher" className="form-control"
                                        value={book.bookPublisher} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">가격</label>
                                <input type="text" name="bookPrice" className="form-control"
                                        value={book.bookPrice} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">페이지</label>
                                <input type="text" name="bookPageCount" className="form-control"
                                        value={book.bookPageCount} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">장르</label>
                                <input type="text" name="bookGenre" className="form-control"
                                        value={book.bookGenre} onChange={changeBook}/>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                        {book.bookId === undefined ?
                            <button className="btn btn-success" onClick={saveBook}>저장</button>
                            :
                            <button className="btn btn-success" onClick={updateBook}>수정</button>
                        }

                    </div>
                    </div>
                </div>
            </div>

          
        </>
    );
};

export default Book;