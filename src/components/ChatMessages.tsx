import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Questions from "./Questions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import questions from "./questions.json";
import ChatInput from "./ChatInput";
import Answer from "./Answer";

export default function ChatMessages() {
  const questionLen = questions.length - 1;
  const [radioDisable, setRadioDisable] = useState(false);
  const [messageDisable, setMessageDisable] = useState(true);
  const question = questions;
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [chat, setChat] = useState<any[]>([]);
  const [answer, setAnswer] = useState<any[]>([
    { ques: "service", ans: "" },
    { ques: "name", ans: "" },
    { ques: "contact", ans: "" },
    { ques: "city", ans: "" },
    { ques: "state", ans: "" },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [chat]);

  const onAnswer = (ans: any) => {
    setChat((prev) => [...prev, ans]);

    setAnswer((prev) => {
      const updatedAns = [...prev];
      updatedAns[currentQuestionIndex].ans = ans.answer;
      return updatedAns;
    });

    console.log(answer);

    if (currentQuestionIndex <= questionLen) {
      setChat((prev) => [...prev, question[currentQuestionIndex]]);

      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setChat((prev) => [
        ...prev,
        {
          type: "question",
          question: "Thank you for Choosing Career Definer!",
        },
      ]);

      setMessageDisable(true);
    }
  };

  return (
    <>
      <div ref={messageRef} className="h-full border p-2 overflow-auto">
        <Questions>
          Welcome to Career Definer I am here to assist you in finding the right
          career path. To better assist you, could you plese provide me with
          some details?
        </Questions>
        <div>
          <Questions key={1}>
            <label htmlFor="">How may I help you today?</label>
            <RadioGroup
              defaultValue="option-one"
              onClick={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  onAnswer({ type: "answer", answer: target.value });
                  setRadioDisable(true);
                  setMessageDisable(false);
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Career Counselling"
                  id="careercounselling"
                  disabled={radioDisable}
                />
                <Label htmlFor="careercounselling">Career Counselling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Admission Guidance"
                  id="admission_guidance"
                  disabled={radioDisable}
                />
                <Label htmlFor="admission_guidance">Admission Guidance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Job Placement"
                  id="job_placement"
                  disabled={radioDisable}
                />
                <Label htmlFor="job_placement">Job Placement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Other"
                  id="other"
                  disabled={radioDisable}
                />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </Questions>
          {chat.map((el) =>
            el?.type === "question" ? (
              <Questions key={el.question}>{el.question}</Questions>
            ) : (
              <Answer key={el?.answer}>{el?.answer}</Answer>
            )
          )}
        </div>
      </div>
      <ChatInput
        className="px-4  "
        onSubmitAns={onAnswer}
        messageDisable={messageDisable}
      />
    </>
  );
}
