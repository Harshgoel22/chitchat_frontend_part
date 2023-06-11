import {Provider} from 'react-redux';
import DashBoard from "./Message/DashBoard";
import Home from './Login_Signup/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import store from '../redux/store';

const App= () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/DashBoard/:id' element={<DashBoard/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;