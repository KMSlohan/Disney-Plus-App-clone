import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

const Nav = () => {

  // localStorage에 저장된 사용자 정보가 있으면 가져오고 없으면 빈 객체 할당
  const initialUserData = localStorage.getItem("userData") ?
  JSON.parse(localStorage.getItem("userData")) : {}

  const [show, setShow] = useState(false) // scroll 위치
  const { pathname } = useLocation() // 현재 url
  const [searchValue, setSearchValue] = useState("") // 검색 내용
  const navigate = useNavigate()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const [userData, setUserData] = useState(initialUserData) // 사용자 정보

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { // 로그인 된 상태인지 체크
      if (user) {
        if (pathname === "/") {
          navigate("/main")
        }
      } else {
        navigate("/")
      }
    })
  }, [auth, navigate, pathname])
  

  // 컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    window.addEventListener('scroll', handScroll)
    return () => {
      window.removeEventListener('scroll', handScroll);
    }
  }, []) // 의존성 배열에 빈 값이면 useEffect가 한 번만 실행되고, state가 들어있다면 state가 변경될 때마다 useEffect가 실행된다.


  const handScroll = () => {
    if (window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      setUserData(result.user)
      localStorage.setItem("userData", JSON.stringify(result.user))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUserData({})
      navigate(`/`)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => window.location.href = '/'}
        />
      </Logo>
      {pathname === "/" ? 
      (<Login onClick={handleAuth}>Login</Login>) : 
      <>
        <Input 
          value={searchValue}
          onChange={handleChange}
          className='nav__input' 
          type="text" 
          placeholder='검색해주세요.'
        />
        <SignOut>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown>
            <span onClick={handleSignOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      </>
      }
    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Login = styled.a`
  background-color: rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transfrom: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0,0,0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36x;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.nav`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0px;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`