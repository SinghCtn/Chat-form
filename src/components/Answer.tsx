import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface AnswerProps extends HTMLAttributes<HTMLDivElement> {}

const Answer: FC<AnswerProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn("ml-10 mb-1 flex justify-end mr-1", className)}
    >
      <p className="rounded-lg p-1 bg-green-400 shadow-md inline-block">
        {children}
      </p>
    </div>
  );
};

export default Answer;
