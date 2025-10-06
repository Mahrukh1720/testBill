import { useContext, useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap"; 
import { MyContext } from "../Contact/MyProvider";

const StageOne = () => {

    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, ""]); 

    const handleSubmit = (e) => {
        e.preventDefault();// stop loading
        const value = textInput.current.value;
        const validate = validateInput(value);

        if (validate) {
            setError([false, ""]);
            context.addPlayer(value);
            textInput.current.value = "";
        }
    };

    //create function
    const validateInput = (value) => {
        if (value === '') {
            setError([true, "Sorry, enter something to add "]);
            return false;
        }
        if (value.length <= 2) {
            setError([true, "Sorry you need three character"]);
            return false;
        }
        return true;
    };

    return (
        <>
            <form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group>
                    {error[0] ? <Alert>{error[1]}</Alert> : null}
                    <Form.Control
                        type="text"
                        placeholder="Add Player Name"
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>
                <Button className="miami" variant="primary" type="submit">
                    Add Players
                </Button>
                {context.players && context.players.length > 0 ? (
                    <>
                        <hr />
                        <div>
                            <ul className="list-group">
                                {context.players.map((players, idx) => (
                                    <li key={idx}
                                        className="list-group-item d-flex
                                        justify-content-between align-item-center 
                                        list-group-item-action">
                                        {players}
                                        <span className="badge badge-danger" onClick={() => context.removePlayer(idx)}>X</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="action_button" onClick={() => context.next()}>NEXT</div>
                    </>
                ) : null}
            </form>
        </>
    );

};

export default StageOne;
