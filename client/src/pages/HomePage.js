import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoggedInContext } from "../context/loggedInContext";

const HomePage = () => {
    const navigate = useNavigate();
    const { loggedIn } = useLoggedInContext();

    // * use getUsername utility funciton  -> create it in utils folder.

    return (
        <section>
            {loggedIn
                ? <section className="home-section">
                    <h1> ReadWell</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatem nisi velit assumenda reprehenderit,
                        dolores eos accusantium beatae ea, eveniet quidem
                        veniam et suscipit delectus minus molestias commodi
                        vitae vel aliquid!
                    </p>
                    <div className="btn-div">
                        <button
                            className="btn"
                            onClick={() => {
                                navigate("/user");
                            }}
                        >
                            Add Books
                        </button>
                    </div>
                </section>
                :
                <section className="home-section">
                    <h1>ReadWell</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Voluptatem nisi velit assumenda reprehenderit,
                        dolores eos accusantium beatae ea, eveniet quidem
                        veniam et suscipit delectus minus molestias commodi
                        vitae vel aliquid!
                    </p>
                    <div className="btn-div">
                        <button
                            className="btn"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Log In
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </section>}
        </section>
    );
};

export default HomePage;
