import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define a basic type for the scenario data (adjust as needed)
interface PhishingScenario {
  id: number;
  title: string;
  description: string; // The simulated phishing message/content
  options: { text: string; isCorrect: boolean }[];
  feedbackCorrect: string; // Basic feedback
  feedbackIncorrect: string; // Basic feedback
  linkHoverText?: string; // Optional: Text explaining what hovering over a link might show
  detailedFeedback?: { [key: number]: string }; // Optional: Detailed feedback per option index
}

interface PhishingScenarioModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  scenario: PhishingScenario | null;
}

const PhishingScenarioModal: React.FC<PhishingScenarioModalProps> = ({ isOpen, onOpenChange, scenario }) => {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const handleClose = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    onOpenChange(false);
  }

  if (!scenario) return null;

  const isCorrectSelection = selectedOption !== null && scenario.options[selectedOption]?.isCorrect;

  // Function to render description with interactive links
  const renderDescriptionWithLinks = (description: string, linkHoverText?: string) => {
    // Simple URL regex (adjust if needed for more complex cases)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex) && linkHoverText) {
        return (
          <TooltipProvider key={index} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Render link as a button to prevent actual navigation */}
                <Button variant="link" className="p-0 h-auto inline text-blue-600 underline decoration-dotted">
                  {part}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link Destination (Simulated): {linkHoverText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        // Render normal text parts with preserved whitespace
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{scenario.title}</DialogTitle>
          <DialogDescription>Read the scenario below and choose the safest action.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
           {/* Display the simulated phishing content */}
           <div className="p-4 border rounded-md bg-muted/40 text-sm space-y-2">
             {/* Render description with interactive links */}
             <div>{renderDescriptionWithLinks(scenario.description, scenario.linkHoverText)}</div>
           </div>

           {!showFeedback && (
             <div className="space-y-2">
               <p className="font-medium">What should you do?</p>
               {scenario.options.map((option, index) => (
                 <Button
                   key={index}
                   variant="outline"
                   className="w-full justify-start text-left h-auto whitespace-normal"
                   onClick={() => handleOptionSelect(index)}
                 >
                   {option.text}
                 </Button>
               ))}
             </div>
           )}

           {showFeedback && selectedOption !== null && (
            <Alert variant={isCorrectSelection ? 'default' : 'destructive'}>
               {isCorrectSelection ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
               <AlertTitle>{isCorrectSelection ? 'Correct!' : 'Incorrect!'}</AlertTitle>
               <AlertDescription>
                 {// Use detailed feedback if available, otherwise fallback to basic feedback
                   scenario.detailedFeedback?.[selectedOption] ?? (isCorrectSelection ? scenario.feedbackCorrect : scenario.feedbackIncorrect)
                 }
               </AlertDescription>
             </Alert>
           )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhishingScenarioModal; 