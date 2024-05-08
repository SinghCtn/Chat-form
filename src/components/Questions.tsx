import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes, useState } from "react";

interface QuestionsProps extends HTMLAttributes<HTMLDivElement> {}

const Questions: FC<QuestionsProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn("mr-10 mb-1", className)}>
      <p className="rounded-lg p-2 border border-zinc-300 shadow-md inline-block">
        {children}
      </p>
    </div>
  );
};

export default Questions;
