import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'


const Nav = () => {

  const [show, setShow] = useState(false) // scroll 위치
  const { pathname } = useLocation() // 현재 url
  const [searchValue, setSearchValue] = useState("") // 검색 내용
  const navigate = useNavigate()



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

  return (
    <div>
      <NavWrapper show={show}>
        <Logo>
          <img 
            alt="Disney Plus Logo"
            src="/images/logo.svg"
            onClick={() => window.location.href = '/'}
          />
        </Logo>
        {pathname === "/" ? (<Login>Login</Login>) : 
        <Input 
          value={searchValue}
          onChange={handleChange}
          className='nav__input' 
          type="text" 
          placeholder='검색해주세요.'/>}
      </NavWrapper>
    </div>
  )
}

export default Nav

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