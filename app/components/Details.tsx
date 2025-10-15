import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import React from "react"; 


const ScoreBadge = ({ score }: { score: number }) => {

  const bgColor = score > 69
    ? "bg-green-600"
    : score > 39
      ? "bg-yellow-600"
      : "bg-red-600";
  
  const textColor = "text-white"; 

  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-full font-bold shadow-md",
        bgColor
      )}
    >
      
      <svg className="size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.31L22 9.27l-5 4.87 1.18 6.88L12 18.25l-6.18 3.75L7 14.14l-5-4.87 5.91-.96L12 2z"/></svg>
      
      <p className={cn("text-sm font-medium", textColor)}>
        {score}/100
      </p>
    </div>
  );
};


const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-1">
      <p className="text-xl font-semibold text-white">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};


const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      
     
      
     
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-3 rounded-lg p-4 shadow-inner",
             
              tip.type === "good"
                ? "bg-green-900/40 border border-green-700 text-green-300"
                : "bg-red-900/40 border border-red-700 text-red-300"
            )}
          >
            <div className="flex flex-row gap-3 items-start">
            
              <svg 
                  className={cn("w-5 h-5 mt-0.5 flex-shrink-0", tip.type === "good" ? "text-green-400" : "text-red-400")} 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                  
                  {tip.type === "good" 
                      ? (
                          <>
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <path d="M9 11l3 3L22 4"/>
                          </>
                      )
                      : (
                          <>
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                              <path d="M12 9v4"/>
                              <path d="M12 17h.01"/>
                          </>
                      )
                  }
              </svg>
              
              
              <p className="text-lg font-bold">
                  {tip.type === "good" ? 'Strength: ' : 'Improvement: '}
                  <span className="font-normal text-white">{tip.tip}</span>
              </p>
            </div>
            
           
            <p className="text-sm text-gray-300 ml-8">
                {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    
    <div className="flex flex-col gap-6 w-full pt-4"> 
      <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-3">Detailed Category Breakdown</h3>
      <Accordion defaultOpen="tone-style" allowMultiple>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content Relevance"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure & Formatting"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Keywords & Skills Match"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
