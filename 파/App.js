import { useRef, useState } from "react";

import { signup, login, logout, useAuth } from "./firebase";

export default function App() {
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();

  const idRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value, idRef.current.value);
    } catch {
      alert("중복된 아이디거나 제대로 입력하지 않았습니다");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value, idRef.current.value);
    } catch {
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("에러");
    }
    setLoading(false);
  }

  return (
    <div id="main">
      
      <div>웰컴: { currentUser?.email } </div>

      <div id="fields">
        <input ref={idRef} placeholder="닉네임" />
        <input ref={emailRef} placeholder="___@___.com" />
        <input ref={passwordRef} type="password" placeholder="6자리 이상 비밀번호" />
      </div>

      <button disabled={ loading || currentUser } onClick={handleSignup}>회원가입</button>
      <button disabled={ loading || currentUser } onClick={handleLogin}>로긘</button>
      <button disabled={ loading || !currentUser } onClick={handleLogout}>로그아웃</button>

    </div>
  );
}