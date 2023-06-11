import logo from '../../images/chitchat_logo.png'
import Login from './Login';
import Signup from './Signup';

const Home = () => {
    const manageUser = (event)=> {
        try{
            const name = event.target.name;
            const root1 = document.getElementById('login_page');
            if(name==="login_page"){
                root1.classList.remove('z-0');
                root1.classList.add('z-20');
            }else{
                root1.classList.remove('z-20');
                root1.classList.add('z-0');
            }
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-400 min-h-screen relative flex flex-row">
            <div className="text max-w-lg">
                <img src={logo} alt="logo" className="h-20 mt-8 ml-8"></img>
                <p className="text-white text-5xl font-bold mt-40 ml-16">Hang out <p className="pt-2">anytime, anywhere</p></p>
                <p className="text-white ml-16 mt-8 text-lg">ChitChat makes it easy and fun to stay close to your favourite people.</p>
            </div>
            <div className="signup_login flex max-w-md relative">
                <Login manageUser={manageUser}/>
                <Signup manageUser={manageUser}/>
            </div>
        </div>
    );
}

export default Home;