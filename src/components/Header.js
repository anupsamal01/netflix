import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate()
  const dispatch  = useDispatch()
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName} = user;
        dispatch(addUser({uid: uid, email:email, displayName:displayName}))
        navigate("/browse");
        // ...
      } else {
        // User is signed out
       dispatch(removeUser())
       navigate("/");
      
      }
    });
     // Unsiubscribe when component unmounts
     return () => unsubscribe();
  },[])

  const handleSignout = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage)
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
       <div className='flex p-2'>
      {showGptSearch&&(<select  className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
        {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
        </select>)}
     
        <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch? "Home Page" : "GPT Search"}</button>
        <img className="w-12 h-12" src="https://occ-0-3752-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTi9kBITJ42rX3rFIvDPnekLahQ7WTIRdKnZ5KV7FGM_D4tu-yg0Z3sXcEche21l8t0ZrgqIbi9BccxKYgc7GXazwowdFdhIAyW3gLxuA0eJ2kUTksCJwXPEzOyY8LiRlaruJnWM7wFKRg.png?r=e6e" alt="usericon" />
        <button onClick={handleSignout} className='font-bold text-white'>Sign Out</button>
       </div>
        </div>
  )
}

export default Header