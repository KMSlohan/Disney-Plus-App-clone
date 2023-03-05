import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Nav = () => {

  const [show, setShow] = useState(false) // scroll 위치

  // 컴포넌트가 렌더링될 때 실행
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
  })
  return () => {
    window.removeEventListener('scroll', () => {});
  }
}, []) // 의존성 배열에 빈 값이면 useEffect가 한 번만 실행되고, state가 들어있다면 state가 변경될 때마다 useEffect가 실행된다.

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
      </NavWrapper>
    </div>
  )
}

export default Nav


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