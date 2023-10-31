import { useState } from "react";

const Exam07 =()=>{

    const [member, setMember] = useState({
        memberId : "testuser1",
        memberPw : "Testuser1!",
        memberPwRe : "Testuser1!"
    });

    const changeMember = e=>{
        setMember({
            ...member,
            [e.target.name] : e.target.value
        });
    };

    return(
        <>
        <h1>회원가입</h1>
        <div className="row mt-3">
        아이디
        <input className="form-control" value={member.memberId} onChange={changeMember}/>
        </div>

        <div className="row mt-3">
        비밀번호
        <input className="form-control" value={member.memberPw} onChange={changeMember}/>
        </div>

        <div className="row mt-3">
        비밀번호 확인
        <input className="form-control" value={member.memberPwRe} onChange={changeMember}/>
        </div>

        <div className="row text-end">
            <button type="submit" className="btn btn-success">가입하기</button>
        </div>
        </>
    );
};
export default Exam07;