import { useDispatch } from 'react-redux';
import { logout } from '../../Store/authSlice';
import authService from '../../appwrite/auth';

function LogoutBtn() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-400 text-white font-medium px-5 py-2 rounded-md transition duration-300 md:text-[14px] text-[10px] shadow-sm cursor-pointer">
      Logout
    </button>
  );
}

export default LogoutBtn;
