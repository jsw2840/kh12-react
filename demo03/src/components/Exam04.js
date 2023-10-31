import { useState } from "react";

function Exam04() {
    const [count, setCount] = useState(0);

    function text(e) {
       
        setCount(e.target.value.length);
     
    }

    return (
        <>
            <h1>주말에 뭐하세요?</h1>
            <textarea maxLength="1000" rows={10} cols={100} onChange={text} />
            <br />
            {count}/1000 bytes
        </>
    );
}

export default Exam04;