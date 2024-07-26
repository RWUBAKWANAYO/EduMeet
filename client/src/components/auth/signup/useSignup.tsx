import { useContext, useRef, useState } from "react";
import { UserContext } from "../../../hooks/context/UserContext";
import { IAuthData, IAuthResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import AxiosInstance from "../../../lib/axiosInstance";
import { AxiosResponse } from "axios";
import { socket } from "../../../lib/socket";

export const useSignup = () => {
  const { saveUser } = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);
  const [photo, setPhoto] = useState<any >(null)
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation<IAuthResponse, Error, IAuthData>(
    async (data: IAuthData): Promise<IAuthResponse> => {
      const response: AxiosResponse<IAuthResponse> = await AxiosInstance({
        url: "/auth/signup",
        method: "POST",
        data,
      });
      return response.data;
    },
    {
      onSuccess: (data: IAuthResponse) => {
        saveUser(data);
        socket.emit("join-user-to-socket", data.user._id);
        navigate("/");
      },
    }
  );

	const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPhoto(e.target?.files![0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      const formData:any = new FormData();
      formData.append("full_name",nameRef?.current?.value);
      formData.append("email", emailRef?.current?.value);
      formData.append("password", passwordRef?.current?.value);
      if (photo) {
        formData.append("file", photo);
      }
    mutate(formData);
  };



  return { emailRef,photo, photoHandler, nameRef, passwordRef, handleSubmit, isLoading, error };
};
