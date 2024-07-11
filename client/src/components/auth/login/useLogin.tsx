import { useContext, useRef } from "react";
import { UserContext } from "../../../hooks/context/UserContext";
import { ILoginData, ILoginResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import AxiosInstance from "../../../lib/axiosInstance";
import { AxiosResponse } from "axios";
import { socket } from "../../../lib/socket";

export const useLogin = () => {
  const { saveUser } = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation<ILoginResponse, Error, ILoginData>(
    async (data: ILoginData): Promise<ILoginResponse> => {
      const response: AxiosResponse<ILoginResponse> = await AxiosInstance({
        url: "/auth/login",
        method: "POST",
        data,
      });
      return response.data;
    },
    {
      onSuccess: (data: ILoginResponse) => {
        saveUser(data);
        socket.emit("join-user-to-socket", data.user._id);
        navigate("/");
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    mutate(user);
  };

  return { emailRef, passwordRef, handleSubmit, isLoading, error };
};
