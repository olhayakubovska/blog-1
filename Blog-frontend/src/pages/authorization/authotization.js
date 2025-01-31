import { useState } from "react";
import styled from "styled-components";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../../components";
import { Button, H2, AuthFormError } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions/set-user";
import { ROLE } from "../../constants";
import { selectUserRole } from "../../selects";
import { useResetForm } from "../../components/hooks/use-reset-form";
import { request } from "../../utils";

const authScheme = yup.object().shape({
  login: yup
    .string()
    .matches(/^\w+$/, "Неверный логин. Допускаються только буквы и цифры")
    .required("Заполните логин")
    .min(3, "Неверный логин. Должно быть не меньше 3 символов")
    .max(15, "Неверный логин. Должно быть не больше 15 символов"),
  password: yup
    .string()
    .required("Пароль обязательный")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаються только буквы и цифры # %"
    )
    .min(6, "Неверно заполнен пароль. Должно быть не меньше 6 символов")
    .max(30, "Неверно заполнен пароль. Должно быть не больше 30 символов"),
});

const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  margin: 20px 0;
  font-size: 18px;
`;

const AvtorizationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authScheme),
  });

  const [serverError, setServerError] = useState();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/login", "POST", { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса:' ${error}`);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMassege = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Авторизация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Login..."
          {...register("login", { onChange: () => setServerError(null) })}
        />
        <Input
          type="password"
          placeholder="Password..."
          {...register("password", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={formError}>
          Авторизация
        </Button>
        {errorMassege && <AuthFormError>{errorMassege}</AuthFormError>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AvtorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 250px;
  & > form {
    display: flex;
    flex-direction: column;
  }
`;
