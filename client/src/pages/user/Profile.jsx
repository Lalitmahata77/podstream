import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useUpdateUserMutation } from "../../redux/api/userApiSlice"
import { setCreadintial } from "../../redux/features/auth/authSlice"
import {toast} from "react-toastify"
import { Link } from "react-router-dom"
import Loader from "../../components/Loader"

const Profile = () => {
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state)=>state.auth)

    
    const [updateUser, {isLoading : loadingUpdateProfile}] = useUpdateUserMutation()
    useEffect(() => {
        setUserName(userInfo.username);
        setEmail(userInfo.email);
      }, [userInfo.email, userInfo.username]);
      // console.log(userInfo._id);
      const submitHandler = async(e)=>{
e.preventDefault()
if (password != confirmPassword) {
    toast.error("Password not match")
}else{
    try {
        const res = await updateUser({
          _id:userInfo._id,
          username,
          email,
          password}).unwrap()
      
        
        dispatch(setCreadintial({...res}))
        toast.success("Profile updated successfully");
    } catch (error) {
        toast.error(error?.data?.message || error.message)
    }
}
      }
  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-center align-center md:flex md:space-x-4 mt-5">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <Link
                to="/blog"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                Blogs
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile