import { useState } from "react";
import styled from "styled-components";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../../components";
import { Button, H2, AuthFormError } from "../../components";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions/set-user";
import { ROLE } from "../../constants";
import { selectUserRole } from "../../selects";
import { useResetForm } from "../../components/hooks/use-reset-form";
import { request } from "../../utils/request";

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
  passcheck: yup
    .string()
    .required("Повтор пароля обязательный")
    .oneOf([yup.ref("password"), null], "Повтор пароля не совпадает"),
});

const RegistrationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(authScheme),
  });

  const [serverError, setServerError] = useState();

  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  // const onSubmit = ({ login, password }) => {
  //   server.registration(login, password).then(({ error, res }) => {
  //     if (error) {
  //       setServerError(`Ошибка запроса:' ${error}`);
  //       return;
  //     }

  //     dispatch(setUser(res));

  //     sessionStorage.setItem('userData',JSON.stringify(res) )

  //   });
  // };

  const onSubmit = ({ login, password }) => {
    request("/register", "POST", { login, password }).then(
      ({ error, user }) => {
        if (error) {
          setServerError(`Ошибка запроса:' ${error}`);
          return;
        }

        dispatch(setUser(user));
        sessionStorage.setItem("userData", JSON.stringify(user));
      }
    );
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;
  const errorMassege = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Регистрация</H2>
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
        <Input
          type="password"
          placeholder="Password check..."
          {...register("passcheck", { onChange: () => setServerError(null) })}
        />
        <Button type="submit" disabled={formError}>
          Зарегистрироваться
        </Button>
        {errorMassege && <AuthFormError>{errorMassege}</AuthFormError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 250px;
  & > form {
    display: flex;
    flex-direction: column;
  }
`;
