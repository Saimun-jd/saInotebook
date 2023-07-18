import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddNoteForm from "./components/AddNoteForm";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import NavComponent from "./components/Navbar";
import GlobalContextState from "./context/GlobalContextState";
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";

function App() {

    return (
        <>
            <BrowserRouter>
                <GlobalContextState>
                    <UserState>
                        <NoteState>
                            <NavComponent />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    exact
                                    path="/addnote"
                                    element={<AddNoteForm />}
                                />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </NoteState>
                    </UserState>
                </GlobalContextState>
            </BrowserRouter>
        </>
    );
}

export default App;
