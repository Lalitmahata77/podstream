
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import Contact from './pages/contact/contact.jsx'
import CategoryList from './pages/Admin/Category.jsx'
import Home from './Home.jsx'
import Favorites from './pages/podcasts/Favorites.jsx'
import PodcastDetails from './pages/podcasts/PodcastDetails.jsx'
import PodcastList from './pages/Admin/PodcastList.jsx'
import AllProducts from './pages/Admin/AllPodcasts.jsx'
import AdminProductUpdate from './pages/Admin/PodcastUpdate.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/contact' element={<Contact/>}/>

    <Route index={true} path="/" element={<Home />} />
<Route path='/favorites' element={<Favorites/>}/>

<Route path='/podcast/:id' element={<PodcastDetails/>}/>

<Route path='' element={<PrivateRoute/>}>

<Route path='/profile' element={<Profile/>}/>
</Route>

<Route path="/admin" element={<AdminRoute />}>
<Route path="userlist" element={<UserList />} />
<Route path="categorylist" element={<CategoryList/>}/>
<Route path='createPodcast' element={<PodcastList/>}/>
      <Route path="allpodcastslist" element={<AllProducts />} />
      <Route path="podcast/update/:_id" element={<AdminProductUpdate />} />
      
      {/* <Route path="dashboard" element={<AdminDashboard />} /> */}

</Route>

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

