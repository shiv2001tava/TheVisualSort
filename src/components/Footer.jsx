import React from 'react'
import styled from 'styled-components'

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -40px;
  width: 100%;
`

export function Footer() {
  return (
    <FooterDiv>
      Made with Passion by&nbsp;
      <a style={{ color: '#3f51b5', fontSize: '20px' }}>TheBoys</a>
    </FooterDiv>
  )
}
