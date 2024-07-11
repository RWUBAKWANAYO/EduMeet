import { useRef, useState } from "react";

interface IjoinMeetingName {
  value: string;
  input: boolean;
}

export const useJoinMeetingForm = () => {
  const [name, setName] = useState<IjoinMeetingName>({
    value: "",
    input: false,
  });

  const meetingIdRef = useRef<HTMLInputElement>(null);
  const passcodeRef = useRef<HTMLInputElement>(null);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName({ ...name, value: e.target.value });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.value || !meetingIdRef.current?.value) {
      return alert("Please fill all the fields");
    }
    console.log("Join Meeting");
  };

  return {
    name,
    nameHandler,
    meetingIdRef,
    passcodeRef,
    onSubmitHandler,
  };
};
