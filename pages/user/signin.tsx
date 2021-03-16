import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from '../../hooks/userContext';
import Link from "next/link";
import { useRouter } from "next/router";

export default function SigninPage() {
  const { register, handleSubmit, errors } = useForm();
  const { login } = useUser();
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string; }) => {
    const user = (await login(data.email, data.password))
    if (user) {
      router.push('/')
    }
  };

  return (
    <div>
      <header
      >
        <h6>サインイン</h6>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="FormControll">
          <label htmlFor="" className="FormLabel">
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            className="FormTextInput"
            placeholder="mailaddress@example.com"
            ref={register({
              required: true,
              pattern: /^\w+([\.\+-]?\w+)*([-])*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors.email && (
            <span className="sub red">メールアドレスを入力してください。</span>
          )}
        </div>
        <div>
          <label htmlFor="" className="FormLabel">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            className="FormTextInput"
            placeholder="●●●●●●●●●"
            ref={register({
              required: true,
            })}
          />
          {errors.password && (
            <span className="sub red">パスワードを入力してください。</span>
          )}
        </div>
        <button type="submit">
          サインインする
        </button>
      </form>
      <Link href="/signup">
        <a href="">
          登録はこちらから
        </a>
      </Link>
    </div>
  )
};

