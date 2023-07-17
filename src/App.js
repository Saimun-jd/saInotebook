import "./App.css";
import Dashboard from "./components/Dashboard";
import NavComponent from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";

function App() {
    return (
        <>
            <UserState>
                <NoteState>
                    <NavComponent />
                    <Dashboard />
                </NoteState>
            </UserState>
        </>
    );
}

export default App;
