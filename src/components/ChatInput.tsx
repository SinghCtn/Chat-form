"use client";

import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { IoMdSend } from "react-icons/io";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
  onSubmitAns?: (ans: any) => void;
  messageDisable: boolean;
}

const ChatInput: FC<ChatInputProps> = ({
  className,
  onSubmitAns,
  messageDisable,
  ...props
}) => {
  const [input, setInput] = useState<any>({ type: "answer", answer: "" });

  const submitAnswer = () => {
    if (input.answer.trim() !== "") {
      onSubmitAns && onSubmitAns(input);
    }
    setInput({ type: "answer", answer: "" });
  };

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-3 flex-1 overflow-hidden  border-none outline-none flex items-end">
        <TextareaAutosize
          rows={2}
          maxRows={4}
          value={input.answer}
          onChange={(e) =>
            setInput((prev: any) => ({ ...prev, answer: e.target.value }))
          }
          autoFocus
          placeholder="Write a message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6 rounded-lg"
          disabled={messageDisable}
        ></TextareaAutosize>

        <div
          onClick={submitAnswer}
          className="w-10 h-8 bg-green-400 hover:bg-green-200 rounded-full flex justify-center items-center ml-2"
        >
          <IoMdSend className=" h-6 w-6 " />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
