// ユーザーのログイン情報などを取り扱うためのContext
// 参考:
// ・https://firebase.google.com/docs/auth/web/firebaseui
// ・https://qiita.com/k-penguin-sato/items/6e892231922b360a8659

import React, { useState, useEffect, createContext, useContext } from "react";
import { firebase } from "../firebaseClient";
import nookies from "nookies";
import { useRouter } from "next/router";

interface UserContextProps {
  user: firebase.User;
  login: any;
  signup: any;
  signout: any;
}

// contextの作成
export const UserContext = createContext({} as UserContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as firebase.User);
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        console.log(token)
        nookies.destroy(undefined, 'authToken')
        nookies.set(undefined, 'authToken', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/'
        });
      } else {
        setUser(null as firebase.User)
        nookies.destroy(undefined, 'authToken')
        nookies.set(undefined, 'authToken', '', {});
      }
    });
  }, []);

  // ユーザーをログインさせる関数
  const login = async (email: any, password: any) => {
    try {
      // ①ユーザーが入力した emailとpasswordを Firebaseに送る
      // ②emailとpasswordを検証する（firebase側）
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      return user
    } catch (error) {
      alert(error);
    }
  }

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (email: any, password: any) => {
    try {
      // ①ユーザーが入力した emailとpasswordを Firebaseに送る
      // ②emailとpasswordを保存する（firebase側）
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (user === null) return;
      // ④user情報からidTokenを取り出して、cookieに保存する
    } catch (e) {
      const { code } = e;
      switch (code) {
        case "auth/email-already-in-use":
          alert(
            "このメールアドレスはすでに登録済みです。ログインをお試しください。"
          );
          break;
        case "auth/invalid-email":
          alert("不正なメールアドレスのフォーマットです。");
          break;
        case "auth/weak-password":
          alert("パスワードが簡単すぎます。");
          break;
      }
    };
  };

  // ユーザーをログアウトさせる関数
  const signout = async () => {
    try {
      firebase.auth().signOut()
      router.push('/')
    } catch (error) {
      alert(error);
    }
  }

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <UserContext.Provider
      value={{
        user,
        login: login,
        signup: signup,
        signout: signout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)
